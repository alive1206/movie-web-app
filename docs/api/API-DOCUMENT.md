# NguonC API Document

> Nguồn: [https://phim.nguonc.com/api-document](https://phim.nguonc.com/api-document)

**Base URL:** `https://phim.nguonc.com/api`

---

## 1. Danh sách phim

### Phim mới cập nhật

|            |                                        |
| ---------- | -------------------------------------- |
| **Method** | `GET`                                  |
| **URL**    | `/films/phim-moi-cap-nhat?page={page}` |
| **Params** | `page` — số trang (bắt đầu từ 1)       |

```
GET https://phim.nguonc.com/api/films/phim-moi-cap-nhat?page=1
```

### Phim theo danh mục

|            |                                                                                                 |
| ---------- | ----------------------------------------------------------------------------------------------- |
| **Method** | `GET`                                                                                           |
| **URL**    | `/films/danh-sach/{slug}?page={page}`                                                           |
| **Params** | `slug` — loại danh mục (`phim-le`, `phim-bo`, `phim-dang-chieu`, `tv-shows`), `page` — số trang |

```
GET https://phim.nguonc.com/api/films/danh-sach/phim-dang-chieu?page=1
```

---

## 2. Phim & Tập Phim

### Thông tin phim & danh sách tập

|            |                        |
| ---------- | ---------------------- |
| **Method** | `GET`                  |
| **URL**    | `/film/{slug}`         |
| **Params** | `slug` — slug của phim |

```
GET https://phim.nguonc.com/api/film/hoa-thien-cot
```

---

## 3. Thể loại & Quốc gia & Năm

### Phim theo thể loại

|            |                                                                                    |
| ---------- | ---------------------------------------------------------------------------------- |
| **Method** | `GET`                                                                              |
| **URL**    | `/films/the-loai/{slug}?page={page}`                                               |
| **Params** | `slug` — slug thể loại (`hanh-dong`, `tinh-cam`, `co-trang`, …), `page` — số trang |

```
GET https://phim.nguonc.com/api/films/the-loai/hanh-dong?page=1
```

### Phim theo quốc gia

|            |                                                                                |
| ---------- | ------------------------------------------------------------------------------ |
| **Method** | `GET`                                                                          |
| **URL**    | `/films/quoc-gia/{slug}?page={page}`                                           |
| **Params** | `slug` — slug quốc gia (`au-my`, `han-quoc`, `nhat-ban`, …), `page` — số trang |

```
GET https://phim.nguonc.com/api/films/quoc-gia/au-my?page=1
```

### Phim theo năm

|            |                                                               |
| ---------- | ------------------------------------------------------------- |
| **Method** | `GET`                                                         |
| **URL**    | `/films/nam-phat-hanh/{year}?page={page}`                     |
| **Params** | `year` — năm phát hành (`2024`, `2025`, …), `page` — số trang |

```
GET https://phim.nguonc.com/api/films/nam-phat-hanh/2024?page=1
```

---

## 4. Tìm kiếm phim

|            |                                   |
| ---------- | --------------------------------- |
| **Method** | `GET`                             |
| **URL**    | `/films/search?keyword={keyword}` |
| **Params** | `keyword` — từ khóa tìm kiếm      |

```
GET https://phim.nguonc.com/api/films/search?keyword=Regeneration
```

---

## Response Format

### Danh sách phim (List / Search / Filter)

```json
{
  "status": "success",
  "paginate": {
    "current_page": 1,
    "total_page": 3205,
    "total_items": 32047,
    "items_per_page": 10
  },
  "items": [
    {
      "name": "Tên phim",
      "slug": "ten-phim",
      "original_name": "Original Name",
      "thumb_url": "https://...",
      "poster_url": "https://...",
      "created": "2026-01-06T15:26:42.000000Z",
      "modified": "2026-02-17T17:38:54.000000Z",
      "description": "Mô tả phim...",
      "total_episodes": 12,
      "current_episode": "Tập 8",
      "time": "23 phút/tập",
      "quality": "HD",
      "language": "Vietsub",
      "director": "Director Name",
      "casts": "Actor 1, Actor 2"
    }
  ]
}
```

### Chi tiết phim (Film Detail)

```json
{
  "status": "success",
  "movie": {
    "id": "...",
    "name": "Tên phim",
    "slug": "ten-phim",
    "original_name": "Original Name",
    "thumb_url": "https://...",
    "poster_url": "https://...",
    "created": "...",
    "modified": "...",
    "description": "...",
    "total_episodes": 50,
    "current_episode": "Hoàn tất (50/50)",
    "time": "45 phút/tập",
    "quality": "HD",
    "language": "Vietsub + Lồng Tiếng",
    "director": "...",
    "casts": "...",
    "category": {
      "1": {
        "group": { "id": "...", "name": "Định dạng" },
        "list": [{ "id": "...", "name": "Phim bộ" }]
      },
      "2": {
        "group": { "id": "...", "name": "Thể loại" },
        "list": [{ "id": "...", "name": "Cổ Trang" }]
      },
      "3": {
        "group": { "id": "...", "name": "Năm" },
        "list": [{ "id": "...", "name": "2015" }]
      },
      "4": {
        "group": { "id": "...", "name": "Quốc gia" },
        "list": [{ "id": "...", "name": "Trung Quốc" }]
      }
    },
    "episodes": [
      {
        "server_name": "Vietsub #1",
        "items": [
          {
            "name": "1",
            "slug": "tap-1",
            "embed": "https://embed.streamc.xyz/embed.php?hash=...",
            "m3u8": "https://hk.phimmoi.net/.../hls.m3u8"
          }
        ]
      }
    ]
  }
}
```

### Lọc theo thể loại / quốc gia / năm

Response tương tự danh sách phim, bổ sung thêm field `cat`:

```json
{
  "status": "success",
  "paginate": { ... },
  "cat": {
    "name": "Hành Động",
    "title": "Hành Động",
    "slug": "hanh-dong"
  },
  "items": [ ... ]
}
```
