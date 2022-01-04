import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import { Card, Header, Tab, Image, Grid, Button } from "semantic-ui-react";
import PhotoUploadWidget from "../../app/common/imageUpload/PhotoUploadWidget";
import { Photo, Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";

interface Props
{
    profile: Profile;
}

export default observer(function ProfilePhotos({profile}: Props)
{
    // The following code represents the next statements:
    // const {profileStore} = useStore(); 
    // const {isCurrentUser} = profileStore; 
    const {profileStore: {isCurrentUser, uploadPhoto, 
        uploading, loading, setMainPhoto, deletePhoto}} = useStore();
    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const [target, setTarget] = useState('');

    function handlePhotoUpload(file: Blob)
    {
        uploadPhoto(file).then(() => setAddPhotoMode(false));
    }

    function handleSetMainPhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>)
    {
        setTarget(e.currentTarget.name);
        setMainPhoto(photo);
    }

    function handleDeletePhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>)
    {
        setTarget(e.currentTarget.name);
        deletePhoto(photo);
    }

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16} >
                    <Header floated='left' icon='image' content='Photos'/>
                    {isCurrentUser && (
                        <Button 
                            floated='right'
                            basic
                            content={addPhotoMode ? 'Cancel' : 'Add Photo'}
                            onClick={() => setAddPhotoMode(!addPhotoMode)}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width={16} >
                    {addPhotoMode ? 
                    (
                        <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={uploading} />
                    ) 
                    : 
                    (
                        <Card.Group itemsPerRow={5}>
                            {profile.photos?.map((image) => (
                                <Card key={image.id}>
                                    <Image src={image.url} />
                                    {isCurrentUser && (
                                        <Button.Group fluid widths={2}>
                                            <Button 
                                                basic
                                                color="green"
                                                content='Main'
                                                name={'main' + image.id}
                                                disabled={image.isMain}
                                                loading={target === 'main' + image.id && loading}
                                                onClick={e => handleSetMainPhoto(image, e) }
                                            />
                                            <Button 
                                                basic 
                                                color='red' 
                                                icon='trash'
                                                loading={target === image.id && loading}
                                                onClick={e => handleDeletePhoto(image, e)}
                                                disabled={image.isMain}
                                                name={image.id}
                                            />
                                        </Button.Group>
                                    )}
                                </Card>
                            ))}
                        </Card.Group>
                    )}
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    );
})