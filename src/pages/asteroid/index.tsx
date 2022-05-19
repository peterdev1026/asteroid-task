import { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import { Box, Button, Container, Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@mui/material';
import { BubbleChart } from '../../components/asteroid/bubble-chart';
import { ArrowLeft as ArrowLeftIcon } from '../../icons/arrow-left';
import { gtm } from '../../lib/gtm';
import { useSelector } from '../../store';
import { Scrollbar } from '../../components/scrollbar';

const Asteroid: NextPage = () => {
  const { events } = useSelector((state) => state.data);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Head>
        <title>
          Asteroid | Material Kit Pro
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            lg: 'repeat(2, 1fr)',
            xs: 'repeat(1, 1fr)'
          },
          flexGrow: 1
        }}
      >
        <Box
          sx={{
            backgroundColor: 'background.default',
            py: 8
          }}
        >
          <Container
            maxWidth="md"
            sx={{
              pl: {
                lg: 15
              }
            }}
          >
            <NextLink
              href="/"
              passHref
            >
              <Button
                component="a"
                startIcon={<ArrowLeftIcon fontSize="small" />}
              >
                Home
              </Button>
            </NextLink>
            <Typography
              variant="h3"
              sx={{ mt: 3 }}
            >
              Asteroid Table
            </Typography>
            <Scrollbar>
              <Table sx={{ minWidth: 700 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      Id
                    </TableCell>
                    {/* <TableCell>
                      Date
                    </TableCell> */}
                    <TableCell>
                      Name
                    </TableCell>
                    {/* <TableCell>
                      Speed (km/h)
                    </TableCell> */}
                    <TableCell>
                      Max. Diameter (m)
                    </TableCell>
                    <TableCell>
                      Min. Diameter (m)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {events.map((event, index) => (
                    <NextLink
                      href={`/asteroid/${index}`}
                      passHref
                      key={event.id}
                    >
                      <TableRow
                        hover
                      >
                        <TableCell>
                          {event.id}
                        </TableCell>
                        {/* <TableCell>
                          {event.date}
                        </TableCell> */}
                        <TableCell>
                          {event.name}
                        </TableCell>
                        {/* <TableCell>
                          {event.speed}
                        </TableCell> */}
                        <TableCell>
                          {event.maxDiameter}
                        </TableCell>
                        <TableCell>
                          {event.minDiameter}
                        </TableCell>
                      </TableRow>
                    </NextLink>
                  ))}
                </TableBody>
              </Table>
            </Scrollbar>
          </Container>
        </Box>
        <Box
          sx={{
            backgroundColor: 'background.paper',
            py: 15
          }}
        >
          <Container
            maxWidth="md"
            sx={{
              pr: {
                lg: 15
              }
            }}
          >
            <Typography
              sx={{ pb: 3 }}
              variant="h3"
            >
              Asteroid Bubble Chart
            </Typography>
            <Box>
              <BubbleChart events={events} />
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Asteroid;
