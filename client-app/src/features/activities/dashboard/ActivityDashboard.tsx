import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ActivityList from './ActivityList';

export default observer (function ActivityDashboard() 
{
    const {activityStore} = useStore();
    const {activityRegistry, loadActivities} = activityStore;

    useEffect(() => {
        if(activityRegistry.size <= 1) loadActivities();
    },[activityRegistry.size, loadActivities]);
    
    if(activityStore.loadingInitial) return <LoadingComponent content="loading app"/>
    
    return (
        <Grid>
            <Grid.Column width="10">
                <ActivityList />
            </Grid.Column>
            <Grid.Column width="6">
                <h1>Filters</h1>
            </Grid.Column>
        </Grid>
    );
})

