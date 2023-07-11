package main

import (
	"MyPlayer/models"
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

func (app *application) Home(w http.ResponseWriter, r *http.Request) {
	var data = struct {
		Status  string `json:"status"`
		Message string `json:"message"`
		Version string `json:"version"`
	}{
		Status:  "online",
		Message: "MyPlayer",
		Version: "1.0.0",
	}

	json, err := json.Marshal(data)
	if err != nil {
		fmt.Println(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(json)
}

func (app *application) GETItems(w http.ResponseWriter, r *http.Request) {

	rd := time.Now()
	var items = []models.Item{}

	item := models.Item{
		Title:       "title",
		Cover:       "cover",
		ItemType:    "Video",
		CreatedAt:   rd,
		UpdatedAt:   rd,
		PublishedAt: rd,
		FilePath:    "path",
		Watched:     true,
		Likes:       12,
		Category:    "Music",
		Label:       "Recommended",
		Mood:        "Happy",
	}

	pagination := models.Pagination{
		Page:      0,
		PageSize:  0,
		PageCount: 0,
		Total:     0,
	}

	meta := models.Meta{
		Pagination: pagination,
	}

	items = append(items, item)
	items = append(items, item)
	items = append(items, item)

	data := models.ItemData{
		Data: items,
		Meta: meta,
	}

	json, err := json.Marshal(data)
	if err != nil {
		fmt.Println(err)
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	w.Write(json)
}
