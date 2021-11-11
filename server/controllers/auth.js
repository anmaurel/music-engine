import randtoken from "rand-token";
import querystring from "querystring";
import axios from "axios";

import spotifyConf from "../config/spotify.js";

export default {
    login: (req, res) => {
        try {
            const state = randtoken.generate(16);

            const params = {
                client_id: process.env.SPOTIFY_ID,
                response_type: "code",
                redirect_uri: process.env.SPOTIFY_REDIRECT_URL,
                state: state,
                scope: spotifyConf.scope,
                show_dialog: false,
            };

            res.redirect(`${spotifyConf.spotifyAccountsAPI}/authorize?${querystring.stringify(params)}`);
        } catch (error) {
            res.status(400).send(error);
        }
    },
    callback: (req, res) => {
        const error = req.query.error;
        const code = req.query.code || null;
        const state = req.query.state || null;

        if (error) {
            res.status(400).send(`Callback Error: ${error}`);
            return;
        } else if (state === null) {
            res.status(400).send("State mismatch");
            return;
        }

        axios({
            method: "post",
            url: `${spotifyConf.spotifyAccountsAPI}/api/token`,
            params: {
                code: code,
                redirect_uri: process.env.SPOTIFY_REDIRECT_URL,
                grant_type: "authorization_code",
            },
            headers: {
                Authorization:
                    "Basic " +
                    new Buffer.from(
                        process.env.SPOTIFY_ID +
                            ":" +
                            process.env.SPOTIFY_SECRET
                    ).toString("base64"),
            },
            json: true,
        })
            .then((response) => {
                const access_token = response.data["access_token"];
                const refresh_token = response.data["refresh_token"];
                const expires_in = response.data["expires_in"];

                const params = {
                    access_token,
                    refresh_token,
                    expires_in,
                };

                res.redirect(
                    `${process.env.FRONT_URL}/?${querystring.stringify(params)}`
                );
            })
            .catch((error) => {
                res.status(400).send(`Tokens: ${error}`);
            });
    },
    refreshToken: (req, res) => {
        const refresh_token = req.query.refresh_token;

        axios({
            method: "post",
            url: `${spotifyConf.spotifyAccountsAPI}/api/token`,
            params: {
                grant_type: "refresh_token",
                refresh_token: refresh_token,
            },
            headers: {
                Authorization:
                    "Basic " +
                    new Buffer.from(
                        process.env.SPOTIFY_ID +
                            ":" +
                            process.env.SPOTIFY_SECRET
                    ).toString("base64"),
            },
            json: true,
        })
            .then((response) => {
                const access_token = response.data["access_token"];

                res.send({ access_token: access_token });
            })
            .catch((error) => {
                res.status(400).send(`Refresh token: ${error}`);
            });
    },
};
