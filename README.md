# MySteamStats

Visualize your stats from your favorite games on Steam!

## Usage
### Live Demo
https://www.MySteamStats.com/


## Developer
### Environment Variables
| Name | Description |
| - | - |
| `HOST_URL` | URL of the web server (needed for Steam API authentication callback) |
| `ENABLE_DEBUG` | Whether to enable debug mode (Starlette error are shown on `500 Internal Server Error` instead of using custom exception handler) |
| `STEAM_SECRET` | Steam API key, available [here](https://steamcommunity.com/dev/apikey) |
| `AWS_ACCESS_KEY_ID` | The access key for your AWS account. |
| `AWS_SECRET_ACCESS_KEY` | The secret key for your AWS account.  |
| `AWS_DEFAULT_REGION` | The region to use for AWS. |
| `ADMIN_EMAIL` | Email used to access admin panel. |
| `ADMIN_PASSWORD` | Password associated with the Admin account. |


### CI
#### Compile TailwindCSS
```sh
.\tailwindcss.exe -c tailwind.config.js -i tailwind.css -o public/css/styles.css
```
#### Docker Build
```sh
docker build . --tag mysteamstatsapp
```

#### Docker Run
Steam authentication may not work when ran within a Docker container. This is because the callback url (HOST_URL) isn't an address that Steam can verify, or something.

```sh
docker run -e HOST_URL="" -e STEAM_SECRET="" -e AWS_ACCESS_KEY_ID="" -e AWS_SECRET_ACCESS_KEY="" -e AWS_DEFAULT_REGION="" -e ADMIN_EMAIL="" -e ADMIN_PASSWORD="" -p 8000:8000 mysteamstatsapp
```

## Roadmap
This is a changing list of things I need to do.

- [x] Make forms functional

- [x] Utilize Steam API to personalize menu with Steam icon and Steam nickname

- [x] Admin page
    - [x] admin login
    - [x] show feedback
    - [x] sort by reason (filter works)
    - [x] delete feedback

- [ ] Game Stats
    - [ ] Proper display names
    - [ ] custom stat display for supported game (cs2, carmechanic, carx)

- [ ] About Page
    - [ ] Make it pretty
    - [ ] describe the platform and it's purpose
    - [ ] talk about me a bit 👉👈

- [ ] "Market"
    - [ ] Make social media accounts
        - [ ] twitter
        - [ ] tiktok
    - [ ] bring up to friends and family
    - [ ] hit up the discord servers

## Known Bugs
- Search input doesn't update if you select all and press backspace
