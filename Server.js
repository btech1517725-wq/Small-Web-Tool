const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const router = express.Router();

router.post("/", async (req, res) => {

    const { url } = req.body;

    if (!url) {
        return res.status(400).json({
            error: "URL Required"
        });
    }

    try {

        const start = Date.now();

        const response = await axios.get(url, {
            timeout: 8000
        });

        const end = Date.now();

        const html = response.data;

        const $ = cheerio.load(html);

        const title = $("title").text();

        const metaDescription =
            $('meta[name="description"]').attr("content") || "";

        const h1Count = $("h1").length;

        const imagesMissingAlt = $("img").filter((i, el) => {
            return !$(el).attr("alt");
        }).length;

        const wordCount = $("body")
            .text()
            .replace(/\s+/g, " ")
            .trim()
            .split(" ").length;

        res.json({
            status: response.status,
            responseTime: ${end - start} ms,
            title,
            metaDescription,
            h1Count,
            imagesMissingAlt,
            wordCount
        });

    } catch (err) {

        if (err.code === "ECONNABORTED") {
            return res.status(408).json({
                error: "Request Timed Out"
            });
        }

        return res.status(500).json({
            error: "Invalid URL or Non HTML page"
        });

    }

});

module.exports = router;
