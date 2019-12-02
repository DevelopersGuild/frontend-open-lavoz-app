import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Grommet, grommet, Box, Heading, InfiniteScroll, Text } from 'grommet';



const GET_LINKS = (page = 2) => gql`
    {
        links(index:${page}){
            href
            content
        }
    }
`;

function Listings() {

    const [stories, setStories] = React.useState([]);



    return (
        <Grommet theme={grommet} >
            <Box align="center" justify="center" >
                <Heading>Stories</Heading>
                <Box size="medium" overflow="auto" align="center" justify="center">
                    <InfiniteScroll items={stories}>
                        {(item) => (
                            <Text>{item}</Text>
                        )}
                    </InfiniteScroll>
                </Box>
            </Box>
        </Grommet>
    );
}

export default Listings;