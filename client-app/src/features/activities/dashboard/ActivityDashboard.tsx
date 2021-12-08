import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    editMode: boolean;
    handleFormOpen: (id: string) => void;
    handleFormClose: () => void;
    handleCreateOrEditActivity: (activity: Activity) => void;
    handleDeleteActivity: (id: string) => void;
}

export default  function ActivityDashboard({activities, selectedActivity, 
    selectActivity, cancelSelectActivity, editMode, handleFormOpen, handleFormClose
    , handleCreateOrEditActivity, handleDeleteActivity }: Props) 
{
    return (
        <Grid>
            <Grid.Column width="10">
                <ActivityList 
                    activities={activities} 
                    selectActivity={selectActivity}
                    handleDeleteActivity={handleDeleteActivity}
                />
            </Grid.Column>
            <Grid.Column width="6">
                {
                    selectedActivity && !editMode &&
                    <ActivityDetails 
                        activities={selectedActivity} 
                        cancelSelectActivity={cancelSelectActivity}
                        handleFormOpen={handleFormOpen}
                    />
                }
                {
                    editMode && 
                    <ActivityForm 
                        handleFormClose={handleFormClose} 
                        selectedActivity={selectedActivity} 
                        handleCreateOrEditActivity={handleCreateOrEditActivity}
                    />
                }
            </Grid.Column>
        </Grid>
    );
}

