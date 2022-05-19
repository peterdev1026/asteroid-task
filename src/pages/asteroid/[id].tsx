import { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, Button, Container, Typography } from '@mui/material';
import { ArrowLeft as ArrowLeftIcon } from '../../icons/arrow-left';
import { gtm } from '../../lib/gtm';
import { useSelector } from '../../store';

const AsteroidDetails: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { events } = useSelector((state) => state.data);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Head>
        <title>
          Asteroid Details | Material Kit Pro
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="md">
          <NextLink
            href="/asteroid"
            passHref
          >
            <Button
              component="a"
              startIcon={<ArrowLeftIcon fontSize="small" />}
            >
              Asteroid
            </Button>
          </NextLink>
          <Typography
            variant="h3"
            sx={{ mt: 3 }}
          >
            Dates on which the given asteroid was or will be closest to the Earth: {events[Number(id)].date}
          </Typography>
          <Typography
            sx={{ mt: 3 }}
            variant="h3"
          >
            the actual distance: {events[Number(id)].distance}km
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default AsteroidDetails;
