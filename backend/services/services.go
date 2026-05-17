package services

import (
	"fmt"
	"log"
	"math/rand"
	"strings"
	"time"

	"tvk-backend/models"
	"tvk-backend/repository"
)

type BusinessService struct {
	repo *repository.Repository
}

func NewBusinessService(pRepo *repository.Repository) *BusinessService {
	return &BusinessService{repo: pRepo}
}

/*
Purpose   : Fetches overall statistics from repository.
Parameter : None
Response  : Returns map of stats and error.

On Success:
===========
Returns populated counts.

On Error:
=========
Returns repository error.

Author       : VIJAY
Created Date : 16-05-2026
*/
func (s *BusinessService) GetStatsMethod() (map[string]interface{}, error) {
	log.Println("GetStatsMethod (+)")
	defer log.Println("GetStatsMethod (-)")

	lIdeas, lResolved, lActive, lVol, lSub, lErr := s.repo.SelectStatsMethod()
	if lErr != nil {
		return nil, fmt.Errorf("GetStatsMethod - DB Error: %w", lErr)
	}

	return map[string]interface{}{
		"ideasCount":       lIdeas,
		"resolvedCount":    lResolved,
		"activeCount":      lActive,
		"volunteersCount":  lVol,
		"subscribersCount": lSub,
	}, nil
}

/*
Purpose   : Processes and stores volunteer registration.
Parameter : pReq (*models.Volunteer)
Response  : Returns generated member ID and error.

On Success:
===========
Generates member ID and saves to database.

On Error:
=========
Returns insert error.

Author       : VIJAY
Created Date : 16-05-2026
*/
func (s *BusinessService) ProcessVolunteerMethod(pReq *models.Volunteer) (string, error) {
	log.Println("ProcessVolunteerMethod (+)")
	defer log.Println("ProcessVolunteerMethod (-)")

	rand.Seed(time.Now().UnixNano())
	lMemberID := fmt.Sprintf("TVK-VOL-%07d", rand.Intn(9000000)+1000000)
	pReq.MemberID = lMemberID

	if lErr := s.repo.InsertVolunteerMethod(pReq); lErr != nil {
		return "", fmt.Errorf("ProcessVolunteerMethod - Insert Error: %w", lErr)
	}

	return lMemberID, nil
}

/*
Purpose   : Processes and stores citizen policy idea.
Parameter : pReq (*models.Idea)
Response  : Returns generated tracking ID and error.

On Success:
===========
Generates tracking ID and saves to database.

On Error:
=========
Returns insert error.

Author       : VIJAY
Created Date : 16-05-2026
*/
func (s *BusinessService) ProcessIdeaMethod(pReq *models.Idea) (string, error) {
	log.Println("ProcessIdeaMethod (+)")
	defer log.Println("ProcessIdeaMethod (-)")

	rand.Seed(time.Now().UnixNano())
	lTrackingID := fmt.Sprintf("TVK-2026-ID-%06d", rand.Intn(900000)+100000)
	pReq.TrackingID = lTrackingID

	if lErr := s.repo.InsertIdeaMethod(pReq); lErr != nil {
		return "", fmt.Errorf("ProcessIdeaMethod - Insert Error: %w", lErr)
	}

	return lTrackingID, nil
}

/*
Purpose   : Processes and stores citizen grievance.
Parameter : pReq (*models.Grievance)
Response  : Returns generated tracking ID and error.

On Success:
===========
Generates tracking ID and saves to database.

On Error:
=========
Returns insert error.

Author       : VIJAY
Created Date : 16-05-2026
*/
func (s *BusinessService) ProcessGrievanceMethod(pReq *models.Grievance) (string, error) {
	log.Println("ProcessGrievanceMethod (+)")
	defer log.Println("ProcessGrievanceMethod (-)")

	rand.Seed(time.Now().UnixNano())
	lTrackingID := fmt.Sprintf("TVK-2026-GR-%06d", rand.Intn(900000)+100000)
	pReq.TrackingID = lTrackingID
	pReq.Status = "Submitted"

	if lErr := s.repo.InsertGrievanceMethod(pReq); lErr != nil {
		return "", fmt.Errorf("ProcessGrievanceMethod - Insert Error: %w", lErr)
	}

	return lTrackingID, nil
}

/*
Purpose   : Processes and stores newsletter subscription.
Parameter : pReq (*models.Subscriber)
Response  : Returns error if email invalid or insert fails.

On Success:
===========
Saves subscriber email to database.

On Error:
=========
Returns validation or insert error.

Author       : VIJAY
Created Date : 16-05-2026
*/
func (s *BusinessService) ProcessSubscriberMethod(pReq *models.Subscriber) error {
	log.Println("ProcessSubscriberMethod (+)")
	defer log.Println("ProcessSubscriberMethod (-)")

	if !strings.Contains(pReq.Email, "@") {
		return fmt.Errorf("invalid email address")
	}

	if lErr := s.repo.InsertSubscriberMethod(pReq); lErr != nil {
		return fmt.Errorf("ProcessSubscriberMethod - Insert Error: %w", lErr)
	}

	return nil
}
