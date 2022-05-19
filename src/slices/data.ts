import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import nasaApi from '../apis/nasaApi';
import type { AppThunk } from '../store';
import type { DataEvent } from '../types/data';

interface DataState {
  events: DataEvent[];
}

const initialState: DataState = {
  events: []
};

const slice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    fetchData(
      state: DataState,
      action: PayloadAction<DataEvent[]>
    ): void {
      state.events = action.payload;
    }
  }
});

export const { reducer } = slice;

export const fetchData = (formValues): AppThunk => async (dispatch): Promise<void> => {
  const response = await nasaApi.get('/feed?', {
    params: {
      start_date: formValues.startDate,
      end_date: formValues.endDate,
      api_key: 'x0HeIJzRCLm3lj0zrfXt2LltusKVCO7aoHmRkVq2'
    }
  });

  const data = response.data.near_earth_objects;
  const asteroids = [];

  for (let date in data) {
    for (let obj in date) {
      if (
        typeof data[date][obj] === 'object' &&
        data[date][obj].is_potentially_hazardous_asteroid
      ) {
        const ast = data[date][obj];
        console.log(ast.links.self);
        asteroids.push({
          date: date,
          id: ast.id,
          name: ast.name,
          speed:
            ast.close_approach_data[0].relative_velocity.kilometers_per_hour,
          distance: ast.close_approach_data[0].miss_distance.kilometers,
          minDiameter: ast.estimated_diameter.meters.estimated_diameter_min,
          maxDiameter: ast.estimated_diameter.meters.estimated_diameter_max,
          url: ast.links.self
        });
      }
    }
  }
  dispatch(slice.actions.fetchData(asteroids));
};
