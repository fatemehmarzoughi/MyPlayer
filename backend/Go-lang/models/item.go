package models

import "time"

type ItemType struct {
	Video string
	Audio string
}

type ItemCategory struct {
	Music string
	Movie string
	Sport string
	Radio string
}

type ItemLabel struct {
	Recommended string
	MostWatched string
	TrendingNow string
	NewReleases string
}

type ItemMood struct {
	Happy  string
	Sad    string
	Comedy string
	Horror string
}

type Item struct {
	Title       string    `json:"title"`
	Cover       string    `json:"cover"`
	ItemType    string    `json:"type"`
	CreatedAt   time.Time `json:"createdAt`
	UpdatedAt   time.Time `json:"updatedAt`
	PublishedAt time.Time `json:"publishedAt`
	FilePath    string    `json:json:"filePath"`
	Watched     bool      `json:"watched"`
	Likes       int       `json:"likes"`
	Category    string    `json:"category"`
	Label       string    `json:"label"`
	Mood        string    `json:"Mood"`
	// ItemType    ItemType     `json:"type"`
	// Category    ItemCategory `json:"category"`
	// Label       ItemLabel    `json:"label"`
	// Mood        ItemMood     `json:"Mood"`

	// relatedItems?: Omit<Data<Item, Attributes<Item>>, 'meta'>;
	// likeListUser?: Omit<Data<User, Attributes<User>>, 'meta'>;
}

type ItemData struct {
	Data []Item `json:"data"`
	Meta Meta   `json:"meta"`
}
