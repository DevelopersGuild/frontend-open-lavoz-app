import React from 'react';
import { Grommet, grommet, Box, Heading, InfiniteScroll, Text } from 'grommet';

function Listings() {

    const [stories, setStories] = React.useState([]);

    React.useEffect(() => {

    }, [])

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