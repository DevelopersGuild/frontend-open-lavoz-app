import React from 'react';
import queryString from "query-string";
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Grommet, grommet, Text, Box, Heading, Image, Anchor, Paragraph } from 'grommet';


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
            <Grommet theme={grommet} >
                <Box fill align="center" justify="center" >
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
        <Grommet theme={grommet} >
            <Query query={GET_STORY(HREF)} >
                {({ loading, error, data }) => {
                    if (loading) return <div>Fetching</div>
                    if (error) return <div>Error</div>
                    return (
                        <Box fill align="center" justify="center" >
                            <Heading size="small">
                                {data.story.headline}
                            </Heading>
                            <Box direction="row">
                                <Text style={{ padding: "1vw" }} >By: {data.story.by}</Text>
                                <Text style={{ padding: "1vw" }} >Date: {data.story.date}</Text>
                                <Anchor style={{ padding: "1vw" }} target="__blank" href={data.story.href} label="Original Story" />
                            </Box>
                            <Box pad="large" align="center" justify="center" >
                                <Paragraph fill size="large" margin="none" textAlign="center">
                                    {data.story.content.join('')}
                                </Paragraph>
                            </Box>
                            <Box border>
                                <Text>
                                    {data.story.tags.join(',')}
                                </Text>
                            </Box>
                        </Box>
                    )
                }}
            </Query>
        </Grommet>
    )
}

export default Story;