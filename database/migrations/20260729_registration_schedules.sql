CREATE TABLE IF NOT EXISTS registration_schedules (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  lead_id BIGINT UNSIGNED NOT NULL,
  requested_at DATETIME NULL,
  status ENUM('new', 'confirmed', 'completed', 'cancelled', 'no_show') NOT NULL DEFAULT 'new',
  email_status ENUM('pending', 'sent', 'failed', 'skipped') NOT NULL DEFAULT 'pending',
  email_sent_at DATETIME NULL,
  email_error TEXT NULL,
  internal_note TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY registration_schedules_lead_unique (lead_id),
  KEY registration_schedules_requested_idx (requested_at),
  KEY registration_schedules_status_idx (status),
  CONSTRAINT registration_schedules_lead_fk FOREIGN KEY (lead_id) REFERENCES enrollment_leads(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
