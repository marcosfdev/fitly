package models

import (
	"errors"
	"html"
	"strings"
	"time"

	"github.com/jinzhu/gorm"
)

type Workout struct {
	ID        uint64    `gorm:"primary_key;auto_increment" json:"id"`
	Title     string    `gorm:"size:255;not null;unique" json:"title"`
	Content   string    `gorm:"text;not null;" json:"content"`
	Author    User      `json:"author"`
	AuthorID  uint32    `gorm:"not null" json:"author_id"`
	CreatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"updated_at"`
}

func (p *Workout) Prepare() {
	p.Title = html.EscapeString(strings.TrimSpace(p.Title))
	p.Content = html.EscapeString(strings.TrimSpace(p.Content))
	p.Author = User{}
	p.CreatedAt = time.Now()
	p.UpdatedAt = time.Now()
}

func (p *Workout) Validate() map[string]string {

	var err error

	var errorMessages = make(map[string]string)

	if p.Title == "" {
		err = errors.New("Required Title")
		errorMessages["Required_title"] = err.Error()

	}
	if p.Content == "" {
		err = errors.New("Required Content")
		errorMessages["Required_content"] = err.Error()

	}
	if p.AuthorID < 1 {
		err = errors.New("Required Author")
		errorMessages["Required_author"] = err.Error()
	}
	return errorMessages
}

func (p *Workout) SaveWorkout(db *gorm.DB) (*Workout, error) {
	var err error
	err = db.Debug().Model(&Workout{}).Create(&p).Error
	if err != nil {
		return &Workout{}, err
	}
	if p.ID != 0 {
		err = db.Debug().Model(&User{}).Where("id = ?", p.AuthorID).Take(&p.Author).Error
		if err != nil {
			return &Workout{}, err
		}
	}
	return p, nil
}

func (p *Workout) FindAllWorkouts(db *gorm.DB) (*[]Workout, error) {
	var err error
	Workouts := []Workout{}
	err = db.Debug().Model(&Workout{}).Limit(100).Order("created_at desc").Find(&Workouts).Error
	if err != nil {
		return &[]Workout{}, err
	}
	if len(Workouts) > 0 {
		for i, _ := range Workouts {
			err := db.Debug().Model(&User{}).Where("id = ?", Workouts[i].AuthorID).Take(&Workouts[i].Author).Error
			if err != nil {
				return &[]Workout{}, err
			}
		}
	}
	return &Workouts, nil
}

func (p *Workout) FindWorkoutByID(db *gorm.DB, pid uint64) (*Workout, error) {
	var err error
	err = db.Debug().Model(&Workout{}).Where("id = ?", pid).Take(&p).Error
	if err != nil {
		return &Workout{}, err
	}
	if p.ID != 0 {
		err = db.Debug().Model(&User{}).Where("id = ?", p.AuthorID).Take(&p.Author).Error
		if err != nil {
			return &Workout{}, err
		}
	}
	return p, nil
}

func (p *Workout) UpdateAWorkout(db *gorm.DB) (*Workout, error) {

	var err error

	err = db.Debug().Model(&Workout{}).Where("id = ?", p.ID).Updates(Workout{Title: p.Title, Content: p.Content, UpdatedAt: time.Now()}).Error
	if err != nil {
		return &Workout{}, err
	}
	if p.ID != 0 {
		err = db.Debug().Model(&User{}).Where("id = ?", p.AuthorID).Take(&p.Author).Error
		if err != nil {
			return &Workout{}, err
		}
	}
	return p, nil
}

func (p *Workout) DeleteAWorkout(db *gorm.DB) (int64, error) {

	db = db.Debug().Model(&Workout{}).Where("id = ?", p.ID).Take(&Workout{}).Delete(&Workout{})
	if db.Error != nil {
		return 0, db.Error
	}
	return db.RowsAffected, nil
}

func (p *Workout) FindUserWorkouts(db *gorm.DB, uid uint32) (*[]Workout, error) {

	var err error
	Workouts := []Workout{}
	err = db.Debug().Model(&Workout{}).Where("author_id = ?", uid).Limit(100).Order("created_at desc").Find(&Workouts).Error
	if err != nil {
		return &[]Workout{}, err
	}
	if len(Workouts) > 0 {
		for i, _ := range Workouts {
			err := db.Debug().Model(&User{}).Where("id = ?", Workouts[i].AuthorID).Take(&Workouts[i].Author).Error
			if err != nil {
				return &[]Workout{}, err
			}
		}
	}
	return &Workouts, nil
}

//When a user is deleted, we also delete the Workout that the user had
func (c *Workout) DeleteUserWorkouts(db *gorm.DB, uid uint32) (int64, error) {
	Workouts := []Workout{}
	db = db.Debug().Model(&Workout{}).Where("author_id = ?", uid).Find(&Workouts).Delete(&Workouts)
	if db.Error != nil {
		return 0, db.Error
	}
	return db.RowsAffected, nil
}
