import { useState } from 'react';
import type { FC } from 'react';
import { useRouter } from 'next/router';
import DatePicker from '@mui/lab/DatePicker';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { fetchData } from '../../slices/data';
import { useDispatch } from '../../store';

export const SpecificPeriod: FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [errors, setErrors] = useState({startDate: '', endDate: ''});

  const handleSubmit = () => {
    if (!startDate) {
      setErrors({
        ...errors,
        startDate: 'You must enter a start date'
      });
    }

    if (!endDate) {
      setErrors({
        ...errors,
        endDate: 'You must enter a end date'
      });
    }

    if (startDate && endDate) {
      const msPerDay = 1000 * 60 * 60 * 24;

      const dateDiffInDays = (a, b) => {
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  
        return Math.floor((utc2 - utc1) / msPerDay);
      };
  
      const a = new Date(startDate),
        b = new Date(endDate),
        difference = dateDiffInDays(a, b);
  
      if (difference > 7) {
        setErrors({
          ...errors,
          endDate: 'Maximum difference between dates is 7 days!'
        });
      } else {
        const formValues = {
          startDate,
          endDate
        };
        dispatch(fetchData(formValues));
        router.push('/asteroid/');
      }
    }
  }

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        minHeight: '100%',
        p: 3
      }}
    >
      <Container maxWidth="lg">
        <form onSubmit={(event) => event.preventDefault()}>
          <div>
            <Typography variant="h5">
              Type in a specific period
            </Typography>
            <Box
              sx={{
                my: 4
              }}
            >
              <Box sx={{ my: 2 }}>
                <DatePicker
                  label="Start Date"
                  onChange={(newDate) => setStartDate(newDate)}
                  renderInput={(inputProps) => (
                    <TextField
                      fullWidth
                      {...inputProps}
                    />
                  )}
                  value={startDate}
                />
                {errors.startDate && <Typography color="error">{errors.startDate}</Typography>}
              </Box>
              <Box sx={{ my: 2 }}>
                <DatePicker
                  label="End Date"
                  onChange={(newDate) => setEndDate(newDate)}
                  renderInput={(inputProps) => (
                    <TextField
                      fullWidth
                      {...inputProps}
                    />
                  )}
                  value={endDate}
                />
                {errors.endDate && <Typography color="error">{errors.endDate}</Typography>}
              </Box>
            </Box>
          </div>
          <Box
            sx={{
              display: 'flex',
              mt: 6
            }}
          >
            <Box sx={{ flexGrow: 1 }} />
            <Button
              color="primary"
              type="submit"
              variant="contained"
              onClick={handleSubmit}
            >
              Show Asteroids
            </Button>
          </Box>
        </form>
      </Container>
    </Box>
  );
};
