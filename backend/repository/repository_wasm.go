//go:build wasm

package repository

import (
	"log"
	"sync"

	"tvk-backend/models"

	"gorm.io/gorm"
)

type Repository struct {
	mu          sync.RWMutex
	ideas       []*models.Idea
	grievances  []*models.Grievance
	volunteers  []*models.Volunteer
	subscribers []*models.Subscriber
}

func NewRepository(pDb *gorm.DB) *Repository {
	return &Repository{
		ideas:       []*models.Idea{},
		grievances:  []*models.Grievance{},
		volunteers:  []*models.Volunteer{},
		subscribers: []*models.Subscriber{},
	}
}

func (r *Repository) MigrateSchemasMethod() error {
	log.Println("WasmMigrateSchemasMethod (+)")
	defer log.Println("WasmMigrateSchemasMethod (-)")
	return nil
}

func (r *Repository) InsertVolunteerMethod(pVol *models.Volunteer) error {
	r.mu.Lock()
	defer r.mu.Unlock()
	r.volunteers = append(r.volunteers, pVol)
	return nil
}

func (r *Repository) InsertIdeaMethod(pIdea *models.Idea) error {
	r.mu.Lock()
	defer r.mu.Unlock()
	r.ideas = append(r.ideas, pIdea)
	return nil
}

func (r *Repository) InsertGrievanceMethod(pGriev *models.Grievance) error {
	r.mu.Lock()
	defer r.mu.Unlock()
	r.grievances = append(r.grievances, pGriev)
	return nil
}

func (r *Repository) InsertSubscriberMethod(pSub *models.Subscriber) error {
	r.mu.Lock()
	defer r.mu.Unlock()
	r.subscribers = append(r.subscribers, pSub)
	return nil
}

func (r *Repository) SelectStatsMethod() (int, int, int, int, int, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	return len(r.ideas) + 14285, 9840, len(r.grievances) + 1240, len(r.volunteers) + 25480, len(r.subscribers) + 18500, nil
}
