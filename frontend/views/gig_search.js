const { Box, Input, Select, Grid, GridItem, Button, Flex } = ChakraUI;
const { useState, useEffect } = React;

function GigSearchPage(){
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [gigs, setGigs] = useState([]);

  async function loadGigs(){
    try{
      const params = {};
      if(query) params.q = query;
      if(category) params.category = category;
      if(minPrice) params.minPrice = minPrice;
      if(maxPrice) params.maxPrice = maxPrice;
      const data = await gigsAPI.searchGigs(params);
      setGigs(data);
    }catch(err){
      console.error('Failed to search gigs', err);
    }
  }

  useEffect(() => { loadGigs(); }, []);

  return (
    <Box className="gig-search-page" p={4}>
      <NavMenu />
      <Box mb={4}>
        <Flex gap={2} flexWrap="wrap">
          <Input placeholder="Search gigs..." value={query} onChange={e=>setQuery(e.target.value)} />
          <Select placeholder="Category" value={category} onChange={e=>setCategory(e.target.value)}>
            <option value="design">Design</option>
            <option value="programming">Programming</option>
            <option value="writing">Writing</option>
          </Select>
          <Input placeholder="Min Price" type="number" value={minPrice} onChange={e=>setMinPrice(e.target.value)} />
          <Input placeholder="Max Price" type="number" value={maxPrice} onChange={e=>setMaxPrice(e.target.value)} />
          <Button colorScheme="teal" onClick={loadGigs}>Search</Button>
        </Flex>
      </Box>
      <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={4}>
        {gigs.map(gig => (
          <GridItem key={gig.id}>
            <GigCard gig={gig} />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}

window.GigSearchPage = GigSearchPage;
