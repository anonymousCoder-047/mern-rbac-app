
import { useEffect, useState } from 'react';

import {
  Alert,
    Box,
    Grid2 as Grid,
} from "@mui/material"
import { Link } from 'react-router';
import { endpoints } from '../../../Server/endpoints';
import { axiosPrivate } from '../../../helper/axios';
import _ from 'lodash';

import useConfig from '../../../hooks/useConfig';
import useAuth from '../../../hooks/useAuth';

const Home = () => {
  const { token } = useAuth();
  const { onboarding, ...rest } = useConfig();
  const [stepsData, setStepsData] = useState({
    totalSteps: 0,
    completedSteps: 0,
  })

  useEffect(() => {
    const getOnboardingProgress = async () => {
      const { Onboarding } = endpoints
      const { data } = await axiosPrivate.get(Onboarding.progress + "/" + onboarding?._id);

      if(!_.isEmpty(data)) {
        const { data: { onboarding_steps }} = data;
        const completedStepsCount = _.sumBy(_.values(onboarding_steps), Boolean);
        const totalSteps = _.size(onboarding_steps);
        setStepsData({ ...stepsData, totalSteps, completedSteps: completedStepsCount });
      }
    };

    if(token) getOnboardingProgress();
  }, [token, onboarding])

  return (
    <>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          {
            ((onboarding?.onboarding_completed != "completed") && (stepsData?.completedSteps != stepsData?.totalSteps)) && (
              <Grid size={12}>
                <Alert severity='info'>
                  {stepsData?.completedSteps}/{stepsData?.totalSteps} steps are completed, to complete the onboarding click <Link to={'/onboarding'} style={{ color: "blue" }}>here</Link>.
                </Alert>
              </Grid>
            )
          }
          <Grid size={12}></Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Home;