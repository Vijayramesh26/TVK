package models

import (
	"time"

	"gorm.io/gorm"
)

type BaseModel struct {
	CreatedBy      string    `gorm:"column:createdBy;not null;default:'SYSTEM'"         json:"createdBy"`
	UpdatedBy      string    `gorm:"column:updatedBy;not null;default:'SYSTEM'"         json:"updatedBy"`
	CreatedDate    time.Time `gorm:"column:createdDate;autoCreateTime" json:"createdDate"`
	UpdatedDate    time.Time `gorm:"column:updatedDate;autoUpdateTime" json:"updatedDate"`
	CreatedProgram string    `gorm:"column:createdProgram;not null;default:'API'"    json:"createdProgram"`
	UpdatedProgram string    `gorm:"column:updatedProgram;not null;default:'API'"    json:"updatedProgram"`
}

type Volunteer struct {
	gorm.Model
	BaseModel
	MemberID string `gorm:"column:memberId;uniqueIndex;not null" json:"memberId"`
	Name     string `gorm:"column:name;not null"                 json:"name"`
	Phone    string `gorm:"column:phone;not null"                json:"phone"`
	Age      int    `gorm:"column:age;not null"                  json:"age"`
	Gender   string `gorm:"column:gender;not null"               json:"gender"`
	District string `gorm:"column:district;not null"             json:"district"`
	Booth    string `gorm:"column:booth"                         json:"booth"`
	Skills   string `gorm:"column:skills"                        json:"skills"`
}

type Idea struct {
	gorm.Model
	BaseModel
	TrackingID  string `gorm:"column:trackingId;uniqueIndex;not null" json:"trackingId"`
	Name        string `gorm:"column:name;not null"                   json:"name"`
	Phone       string `gorm:"column:phone;not null"                  json:"phone"`
	District    string `gorm:"column:district;not null"               json:"district"`
	Category    string `gorm:"column:category;not null"               json:"category"`
	Description string `gorm:"column:description;not null"            json:"description"`
}

type Grievance struct {
	gorm.Model
	BaseModel
	TrackingID  string `gorm:"column:trackingId;uniqueIndex;not null" json:"trackingId"`
	Name        string `gorm:"column:name;not null"                   json:"name"`
	Phone       string `gorm:"column:phone;not null"                  json:"phone"`
	District    string `gorm:"column:district;not null"               json:"district"`
	Category    string `gorm:"column:category;not null"               json:"category"`
	Priority    string `gorm:"column:priority;not null"               json:"priority"`
	Description string `gorm:"column:description;not null"            json:"description"`
	Status      string `gorm:"column:status;not null;default:'Open'"  json:"status"`
}

type Subscriber struct {
	gorm.Model
	BaseModel
	Email string `gorm:"column:email;uniqueIndex;not null" json:"email"`
}

// Response Wrapper items
type ResponseArr struct {
	TrackingID string `json:"trackingId,omitempty"`
	MemberID   string `json:"memberId,omitempty"`
	Message    string `json:"message,omitempty"`
	Count      int    `json:"count,omitempty"`
}

type ResponseStruct struct {
	ResponseArr []ResponseArr `json:"responseArr"`
	Status      string        `json:"status"`
	ErrMsg      string        `json:"errMsg"`
}
