const fs = require('fs')
const constants = require('./constants.json')
const metadata = require('../data/metadata.json')

const generateXmlDoc = (episodesMetadata) => `<?xml version="1.0" encoding="utf-8" standalone="no"?>
<rss xmlns:atom="http://www.w3.org/2005/Atom"
    xmlns:content="http://purl.org/rss/1.0/modules/content/"
    xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
    xmlns:media="http://search.yahoo.com/mrss/" version="2.0">
    <channel>
        <title>Deeper Sounds of Nairobi</title>
        <link>https://www.mixcloud.com/jackrooster/</link>
        <description>Deeper Sounds of Nairobi is a dose of House music.Featuring guest DJs, Artists and Producers from Africa. Deeper Sounds of Nairobi is a promotional radio show recorded and produced in various corners of the world. These two shows are committed to showcasing musical talent coming out of Africa in the House/Dance Genre.</description>
        <atom:link href="https://www.mixcloud.com/jackrooster/" rel="self" />
        <language>en-us</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <ttl>600</ttl>
        <itunes:explicit>no</itunes:explicit>
        <itunes:author>Jack Rooster</itunes:author>
        <image>
            <url>https://raw.githubusercontent.com/laudebugs/jack-rooster/main/dson.jpeg</url>
            <title>Deeper Sounds of Nairobi</title>
            <link>https://www.mixcloud.com/jackrooster/</link>
        </image>
        <itunes:type>episodic</itunes:type>
        <itunes:category text="Music">
            <itunes:category text="House" />
        </itunes:category>
        <itunes:category text="Afrohouse" />
        <itunes:category text="Dance" />
        <copyright>© WNYC</copyright>
        <itunes:image href="https://media.wnyc.org/i/1400/1400/l/80/2022/05/Radiolab-branded-logo-1400x1400.png" />
        <itunes:keywords>Afrohouse,Dance,House,Africa,Nairobi</itunes:keywords>
        <itunes:summary>Caffè Mocha is a dose of House music.Featuring guest DJs,Artists and Producers from Africa. Deeper Sounds of Nairobi is a promotional radio show recorded and produced in various corners of the world. These two shows are committed to showcasing musical talent coming out of Africa in the House/Dance Genre.
        </itunes:summary>
        <itunes:subtitle>Deeper Sounds of Nairobi</itunes:subtitle>
        <itunes:owner>
            <itunes:email>wnycdigital@gmail.com</itunes:email>
            <itunes:name>Jack Rooster</itunes:name>
        </itunes:owner>
    </channel>
${appendEpisodes(episodesMetadata)}
</rss>`

const appendEpisodes = (episodesMetadata) => {
    return Object.entries(episodesMetadata)
        .map(
            ([episode, metadata]) => `        <item>
            <title>${metadata.title}</title>
            <link>${constants.mixcloudBaseUrl + episode}</link>
            <description>${metadata.description}</description>
            <enclosure type="audio/mpeg" url="${metadata.source}" />
            <category>afrohouse</category>
            <category>house</category>
            <category>nairobi</category>
            <category>music</category>
            <category>mix</category>
            <category>jack_rooster</category>
            <category>dson</category>
            <media:content type="audio/mpeg" url="${metadata.source}" />
            <media:description type="plain">${metadata.description}</media:description>
            <media:thumbnail height="600" url="${metadata.coverImage}" width="600" />
            <itunes:duration>${metadata.length}</itunes:duration>
            <content:encoded><![CDATA[<p>${episode.description}</p>]]></itunes:summary>
            <itunes:episodeType>full</itunes:episodeType>
            <author>wnycdigital@gmail.com (WNYC Studios)</author>
            <itunes:explicit>no</itunes:explicit>
            <itunes:subtitle>${metadata.description}</itunes:subtitle>
            <itunes:author>Jack Rooster</itunes:author>
            <itunes:keywords>House,AfroHouse,Nairobi,Music,Dance,Afrobeats</itunes:keywords>
        </item>`,
        )
        .join('\n')
}
const xmlDoc = generateXmlDoc(metadata)

fs.writeFileSync('./data/dson.xml', xmlDoc)