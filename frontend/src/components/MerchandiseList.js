import React from 'react'
import Merchandise from './Merchandise';
import {
    Grid
} from '@material-ui/core';

const MerchandiseList = ({merchandises}) => {
    const listOfMerchandises = merchandises?merchandises.map((merchandise)=>{
        return(
            <Grid item>
                <Merchandise 
                    key={merchandise.id}
                    merchandise={merchandise}
                />
            </Grid>
        )
    }):null

    // const listOfMerchandises =(
    //     <Grid container spacing={3}>
    //         <Grid item xs={4} sm={4} md={3}>
    //             <Merchandise 
    //                 // key={video.id}
    //                 // video={video}
    //             />
    //         </Grid>
    //         <Grid item xs={4} sm={4} md={3}>
    //             <Merchandise 
    //                 // key={video.id}
    //                 // video={video}
    //             />
    //         </Grid>
    //         <Grid item xs={4} sm={4} md={3}>
    //             <Merchandise 
    //                 // key={video.id}
    //                 // video={video}
    //             />
    //         </Grid>
    //         <Grid item xs={4} sm={4} md={3}>
    //             <Merchandise 
    //                 // key={video.id}
    //                 // video={video}
    //             />
    //         </Grid>
    //         <Grid item xs={4} sm={4} md={3}>
    //             <Merchandise 
    //                 // key={video.id}
    //                 // video={video}
    //             />
    //         </Grid>
    //         <Grid item xs={4} sm={4} md={3}>
    //             <Merchandise 
    //                 // key={video.id}
    //                 // video={video}
    //             />
    //         </Grid>
            

    //     </Grid>
    //     )
        // <Grid container spacing={3}>
            
            // <Grid item xs={4} sm={6} md={4}>
            //     <Merchandise 
            //         // key={video.id}
            //         // video={video}
            //     />
            // </Grid>
            // <Grid item xs={12} sm={6} md={4}>
            //     <Merchandise 
            //         // key={video.id}
            //         // video={video}
            //     />
            // </Grid>
            // <Grid item xs={12} sm={6} md={4}>
            //     <Merchandise 
            //         // key={video.id}
            //         // video={video}
            //     />
            // </Grid>
            // <Grid item xs={12} sm={6} md={4}>
            //     <Merchandise 
            //         // key={video.id}
            //         // video={video}
            //     />
            // </Grid>
            // <Grid item xs={12} sm={6} md={4}>
            //     <Merchandise 
            //         // key={video.id}
            //         // video={video}
            //     />
            // </Grid>
            // <Grid item xs={12} sm={6} md={4}>
            //     <Merchandise 
            //         // key={video.id}
            //         // video={video}
            //     />
            // </Grid>


        // <Grid/>
    // )

    return (
        <div>
            {/* {listOfMerchandises} */}

            <Grid container direction="column" spacing={2}>
                {listOfMerchandises}
            </Grid>

            
        </div>
    )
}

export default MerchandiseList
