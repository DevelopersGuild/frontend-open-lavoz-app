import React from 'react';
import {}
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Grommet, grommet, Box, Heading, InfiniteScroll, Text, Anchor, TextInput, FormField } from 'grommet';



const GET_LINKS = (page = 2) => gql`
    {
        links(index:${page}){
            href
            content
        }
    }
`;

const GET_PAGES = gql`
    {
        pages
    }
`;

function Listings() {
    const [page, setPage] = React.useState(2);
    return (
        <Grommet theme={grommet} >
            <Box align="center" justify="center" >
                <Heading>Stories</Heading>
                <Box pad="medium" align="center" justify="center" size="medium" direction="row" >
                    <Query query={GET_PAGES} >
                        {({ loading, error, data }) => {
                            if (loading) return <div>Fetching</div>
                            if (error) return <div>Error</div>
                            return (
                                <Text style={{ paddingRight: "5vw" }}>
                                    Indexes: {data.pages}
                                </Text>
                            )
                        }}
                    </Query>
                    <FormField label="Search Index" >
                        <TextInput size="small" value={page} onChange={(e) => setPage(e.target.value)} />
                    </FormField>
                </Box>
                <Box size="medium" overflow="auto" align="center" justify="center">
                    <Query query={GET_LINKS(page || 2)} >
                        {({ loading, error, data }) => {
                            if (loading) return <div>Fetching</div>
                            if (error) return <div>Error</div>
                            return (
                                <Box align="start" justify="start">
                                    <InfiniteScroll items={data.links}>
                                        {(item, key) => (
                                            <Anchor onClick={() => {
                                                alert(item.href)
                                            }} key={key} label={item.content} size="large" />
                                        )}
                                    </InfiniteScroll>
                                </Box>
                            )
                        }}
                    </Query>
                </Box>
            </Box>
        </Grommet>
    );
}

export default Listings;