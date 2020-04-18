package controllers

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/marcosfdev/fitly/api/auth"
	"github.com/marcosfdev/fitly/api/utils/formaterror"
	"github.com/vmarcosfdev/fitly/api/models"
)

func (server *Server) LikeWorkout(c *gin.Context) {

	//clear previous error if any
	errList = map[string]string{}

	postID := c.Param("id")
	pid, err := strconv.ParseUint(workoutID, 10, 64)
	if err != nil {
		errList["Invalid_request"] = "Invalid Request"
		c.JSON(http.StatusBadRequest, gin.H{
			"status": http.StatusBadRequest,
			"error":  errList,
		})
		return
	}
	uid, err := auth.ExtractTokenID(c.Request)
	if err != nil {
		errList["Unauthorized"] = "Unauthorized"
		c.JSON(http.StatusUnauthorized, gin.H{
			"status": http.StatusUnauthorized,
			"error":  errList,
		})
		return
	}
	// check if the user exist:
	user := models.User{}
	err = server.DB.Debug().Model(models.User{}).Where("id = ?", uid).Take(&user).Error
	if err != nil {
		errList["Unauthorized"] = "Unauthorized"
		c.JSON(http.StatusUnauthorized, gin.H{
			"status": http.StatusUnauthorized,
			"error":  errList,
		})
		return
	}
	// check if the workout exist:
	workout := models.Workout{}
	err = server.DB.Debug().Model(models.Workout{}).Where("id = ?", pid).Take(&workout).Error
	if err != nil {
		errList["Unauthorized"] = "Unauthorized"
		c.JSON(http.StatusUnauthorized, gin.H{
			"status": http.StatusUnauthorized,
			"error":  errList,
		})
		return
	}

	like := models.Like{}
	like.UserID = user.ID
	like.WorkoutID = workout.ID

	likeCreated, err := like.SaveLike(server.DB)
	if err != nil {
		formattedError := formaterror.FormatError(err.Error())
		errList = formattedError
		c.JSON(http.StatusInternalServerError, gin.H{
			"status": http.StatusInternalServerError,
			"error":  errList,
		})
		return
	}
	c.JSON(http.StatusCreated, gin.H{
		"status":   http.StatusCreated,
		"response": likeCreated,
	})
}

func (server *Server) GetLikes(c *gin.Context) {

	//clear previous error if any
	errList = map[string]string{}

	workoutID := c.Param("id")

	// Is a valid workout id given to us?
	pid, err := strconv.ParseUint(workoutID, 10, 64)
	if err != nil {
		fmt.Println("this is the error: ", err)
		errList["Invalid_request"] = "Invalid Request"
		c.JSON(http.StatusBadRequest, gin.H{
			"status": http.StatusBadRequest,
			"error":  errList,
		})
		return
	}

	// Check if the workout exist:
	workout := models.Workout{}
	err = server.DB.Debug().Model(models.Workout{}).Where("id = ?", pid).Take(&workout).Error
	if err != nil {
		errList["No_workout"] = "No Workout Found"
		c.JSON(http.StatusNotFound, gin.H{
			"status": http.StatusNotFound,
			"error":  errList,
		})
		return
	}

	like := models.Like{}

	likes, err := like.GetLikesInfo(server.DB, pid)
	if err != nil {
		errList["No_likes"] = "No Likes found"
		c.JSON(http.StatusNotFound, gin.H{
			"status": http.StatusNotFound,
			"error":  errList,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status":   http.StatusOK,
		"response": likes,
	})
}

func (server *Server) UnLikePost(c *gin.Context) {

	likeID := c.Param("id")
	// Is a valid like id given to us?
	lid, err := strconv.ParseUint(likeID, 10, 64)
	if err != nil {
		errList["Invalid_request"] = "Invalid Request"
		c.JSON(http.StatusBadRequest, gin.H{
			"status": http.StatusBadRequest,
			"error":  errList,
		})
		return
	}
	// Is this user authenticated?
	uid, err := auth.ExtractTokenID(c.Request)
	if err != nil {
		errList["Unauthorized"] = "Unauthorized"
		c.JSON(http.StatusUnauthorized, gin.H{
			"status": http.StatusUnauthorized,
			"error":  errList,
		})
		return
	}
	// Check if the workout exist
	like := models.Like{}
	err = server.DB.Debug().Model(models.Like{}).Where("id = ?", lid).Take(&like).Error
	if err != nil {
		errList["No_like"] = "No Like Found"
		c.JSON(http.StatusNotFound, gin.H{
			"status": http.StatusNotFound,
			"error":  errList,
		})
		return
	}
	// Is the authenticated user, the owner of this workout?
	if uid != like.UserID {
		errList["Unauthorized"] = "Unauthorized"
		c.JSON(http.StatusUnauthorized, gin.H{
			"status": http.StatusUnauthorized,
			"error":  errList,
		})
		return
	}

	// If all the conditions are met, delete the workout
	_, err = like.DeleteLike(server.DB)
	if err != nil {
		errList["Other_error"] = "Please try again later"
		c.JSON(http.StatusNotFound, gin.H{
			"status": http.StatusNotFound,
			"error":  errList,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status":   http.StatusOK,
		"response": "Like deleted",
	})
}
