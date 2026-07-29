# Princeton Academy MySQL Schema

Import bang MySQL CLI:

```bash
mysql -u root -p < database/princeton_academy_schema.sql
```

Hoac trong MySQL Workbench/phpMyAdmin:

1. Mo file `database/princeton_academy_schema.sql`.
2. Chay toan bo file.
3. Kiem tra database `princeton_academy` da co bang.

Sau khi import xong, gui lai cau hinh theo format:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=princeton_academy
DB_USER=root
DB_PASSWORD=12345
```

Schema nay gom cac nhom bang:

- CMS: pages, SEO, navigation, media, site settings.
- Home UI: hero slides, sections, stats, gallery, testimonials, facility images.
- School content: campuses, class programs, curriculum tracks, teaching methods.
- Blog/events: posts, categories, tags, content blocks.
- Enrollment CRM: campaigns, leads, consent, assignments, notes, status history.
- Admin: users, roles, audit logs.

Cap nhat database dang chay:

```bash
mysql -u root -p princeton_academy < database/migrations/20260729_registration_schedules.sql
```

Email xac nhan dang ky se duoc gui qua API cau hinh bang:

```env
GMAIL_CONFIRMATION_API_URL=
GMAIL_CONFIRMATION_API_KEY=
GMAIL_CONFIRMATION_FROM=
```

Neu dung Gmail app password, cau hinh SMTP:

```env
GMAIL_SMTP_HOST=smtp.gmail.com
GMAIL_SMTP_PORT=465
GMAIL_SMTP_USER=
GMAIL_SMTP_PASSWORD=
GMAIL_SMTP_FROM=
REGISTRATION_NOTIFY_TO=
```
