"use client"
import CryptoTable from '@/components/modules/CryptoTable'
import Card from '@mui/material/Card';
import styles from './page.module.css'
import { Box, CardContent, Container, Grid, Slider, TextField, Typography } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from '@/utils/userContext';

export default function Home() {

  const {getTopAmount, setGetTopAmount, searchQuery, setSearchQuery} = useContext(UserContext);


  return (
    <Container sx={{padding: "10px auto"}}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3} md={6}>
          <Card sx={{height:"100%"}}>
            <CardContent>
              <Typography variant="h5" component="h2">
                Crypto Tracker
              </Typography>
              <Typography variant="body2" component="p">
                Track your favorite cryptocurrencies
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={9} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Tracked Cryptos
              </Typography>
            </CardContent>
              <CryptoTable showFavorites/>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Top Cryptos
              </Typography>
              <Typography variant="body2" component="p">
                Select how many top cryptos to display
              </Typography>
              <Slider 
                value={getTopAmount} 
                onChange={(e) => {
                  const target = e.target as HTMLInputElement;
                  if (target) {
                    setGetTopAmount(Number(target.value));
                  }
                }} 
                aria-label="Disabled slider" 
                valueLabelDisplay="auto"
                step={1}
                marks
                min={10}
                max={110}
              />
              <TextField id="search" label="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </CardContent>
              <CryptoTable />
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}
