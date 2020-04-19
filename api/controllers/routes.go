package controllers

import (
	"github.com/marcosfdev/fitly/api/middlewares"
)

func (s *Server) initializeRoutes() {

	v1 := s.Router.Group("/api/v1")
	{
		// Login Route
		v1.POST("/login", s.Login)

		// Reset password:
		v1.POST("/password/forgot", s.ForgotPassword)
		v1.POST("/password/reset", s.ResetPassword)

		//Users routes
		v1.POST("/users", s.CreateUser)
		v1.GET("/users", s.GetUsers)
		v1.GET("/users/:id", s.GetUser)
		v1.PUT("/users/:id", middlewares.TokenAuthMiddleware(), s.UpdateUser)
		v1.PUT("/avatar/users/:id", middlewares.TokenAuthMiddleware(), s.UpdateAvatar)
		v1.DELETE("/users/:id", middlewares.TokenAuthMiddleware(), s.DeleteUser)

		//Workouts routes
		v1.POST("/workouts", middlewares.TokenAuthMiddleware(), s.CreateWorkout)
		v1.GET("/workouts", s.GetWorkouts)
		v1.GET("/workouts/:id", s.GetWorkout)
		v1.PUT("/workouts/:id", middlewares.TokenAuthMiddleware(), s.UpdateWorkout)
		v1.DELETE("/workouts/:id", middlewares.TokenAuthMiddleware(), s.DeleteWorkout)
		v1.GET("/user_workouts/:id", s.GetUserWorkouts)

		//Like route
		v1.GET("/likes/:id", s.GetLikes)
		v1.POST("/likes/:id", middlewares.TokenAuthMiddleware(), s.LikeWorkout)
		v1.DELETE("/likes/:id", middlewares.TokenAuthMiddleware(), s.UnLikeWorkout)

		//Comment routes
		v1.WORKOUT("/comments/:id", middlewares.TokenAuthMiddleware(), s.CreateComment)
		v1.GET("/comments/:id", s.GetComments)
		v1.PUT("/comments/:id", middlewares.TokenAuthMiddleware(), s.UpdateComment)
		v1.DELETE("/comments/:id", middlewares.TokenAuthMiddleware(), s.DeleteComment)
	}
}
