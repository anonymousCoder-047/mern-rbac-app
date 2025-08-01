
import React from 'react';

import {
    Box,
    Grid2 as Grid,
    Modal,
    Typography,
} from "@mui/material"

const ModalComponent = ({
    isOpened=false,
    handleClose=()=>{},
    styles={},
    data={},
    isTabs=false,
    tabsData={},
}) => {

    return (
      <>
          <Box>
            <Modal
                open={isOpened}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styles}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {data?.title}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {data?.description}
                    </Typography>
                </Box>
            </Modal>
          </Box>
      </>
    );
}

export default ModalComponent;