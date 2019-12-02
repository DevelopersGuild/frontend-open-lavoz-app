import React from 'react';
import queryString from "query-string"
import { Grommet, grommet, Text } from 'grommet';

function Story({ match, location }) {
    return (
        <Grommet theme={grommet} >
            <Text>
                Story
            </Text>
            <p>
                <strong>Location Props: </strong>
                {JSON.stringify(match)}
            </p>
        </Grommet>
    )
}

export default Story;