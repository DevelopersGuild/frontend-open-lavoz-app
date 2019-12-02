import React from 'react';
import queryString from "query-string";
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Grommet, grommet, Text, Box, Heading, Image, Anchor, Paragraph } from 'grommet';
import { AppBar, Toolbar, Typography, Chip, Button } from '@material-ui/core';
import { Facebook, Twitter } from '@material-ui/icons';

const GET_STORY = (href) => gql`
{
        story(url:"${href}"){
            headline
            by
            date
            tags
            content
            href
        }
}
`;

function Story({ match, location }) {
    const HREF = queryString.parse(location.search).href;

    if (!HREF) {
        return (
            <Grommet full theme={grommet} >
                <Box fill="horizontal" >
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6">
                                Open La Voz
                        </Typography>
                        </Toolbar>
                    </AppBar>
                </Box>
                <Box align="center" justify="center" >
                    <Heading>Story not found.</Heading>
                    <Box height="medium" width="medium">
                        <Image
                            fit="cover"
                            src="https://media.giphy.com/media/a9xhxAxaqOfQs/giphy.gif"
                        />
                    </Box>
                    <br />
                    <Text>
                        Maybe try putting a href tag in the url query parameters
                        or try searching on the main page.
                    </Text>
                </Box>
            </Grommet>
        )
    }
    return (
        <Grommet full theme={grommet} >
            <Box fill="horizontal" >
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6">
                            Open La Voz
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <Query query={GET_STORY(HREF)} >
                {({ loading, error, data }) => {
                    if (loading) return <div>Fetching</div>
                    if (error) return <div>Error</div>
                    return (
                        <Box align="center" justify="center" >
                            <Heading size="small">
                                {data.story.headline}
                            </Heading>
                            <Box wrap direction="row">
                                <Text style={{ padding: "1vw" }} >By: {data.story.by.trim().length > 0 ? data.story.by : 'Unknown Contributor'}</Text>
                                <Text style={{ padding: "1vw" }} >Date: {data.story.date}</Text>
                                <Anchor style={{ padding: "1vw" }} target="__blank" href={data.story.href} label="Original Story" />
                                <Button size="small" style={{ margin: "1vw" }} startIcon={<Facebook />} variant="contained" color="default" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${HREF}`)}>
                                    Share on Facebook
                                </Button>
                                <Button size="small" style={{ margin: "1vw" }} startIcon={<Twitter />} variant="contained" color="default" onClick={() => window.open(`https://twitter.com/intent/tweet?text=${data.story.headline}${" via Open La Voz"}&url=${HREF}`)}>
                                    Share on Twitter
                                </Button>
                            </Box>
                            <Box pad="large" align="center" justify="center" >
                                <Paragraph fill size="medium" margin="none" textAlign="center">
                                    {data.story.content.join('')}
                                </Paragraph>
                            </Box>
                            <Box wrap direction="row">
                                {data.story.tags.map((x, key) => <Chip onClick={() => { window.open(`https://lavozdeanza.com/tag/${x.replace(/\s+/g, '-').toLowerCase()}`, '__blank') }} clickable style={{ marginRight: "0.5vw", marginLeft: "0.5vw" }} key={key} label={x} />)}
                            </Box>
                        </Box>
                    )
                }}
            </Query>
        </Grommet>
    )
}

export default Story;