
import { Box } from "@mui/material"
import { Oval } from "react-loader-spinner"

import useConfig from "../../hooks/useConfig";

export const AppLoaderComponent = ({ children }) => {
    const { isLoading } = useConfig();

    return (
        <>
            { isLoading ? (
                <Box
                    sx={{
                        width: "100%",
                        height: "100vh"
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            height: "100%"
                        }}
                    >
                        <Oval
                            visible={isLoading}
                            height="80"
                            width="80"
                            color="#4fa94d"
                            ariaLabel="oval-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                        />
                    </Box>
                </Box>)
                : children
            }
        </>
    )
}