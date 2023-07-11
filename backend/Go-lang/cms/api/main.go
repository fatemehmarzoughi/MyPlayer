package main

import (
	"fmt"
	"net/http"
)

type application struct {
	Domain string
}

func main() {

	var app application

	app.Domain = "MyPlayer.com"

	const port string = "8080"

	fmt.Println("Stating the development server on port", port)

	err := http.ListenAndServe(fmt.Sprintf(":%v", port), app.Routes())
	if err != nil {
		fmt.Print(err)
	}

}
