import React from 'react';
import queryString from "query-string";
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Grommet, grommet, Text, Box, Heading, Image } from 'grommet';


const GET_STORY = (href) => gql`
   {
        story(url:${href}){
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
                    return(
                        <Text>
                            {data.headline}
                        </Text>
                    )
                }}
            </Query>
        </Grommet>
    )
}

export default Story;