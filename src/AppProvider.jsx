
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";

import { AppLoaderComponent } from "./Components/Common/LoaderComponent";
import ErrorBoundary from "./Components/Pages/Error/ErrorBoundary";
import Toaster from "./Components/Common/Toaster";

import AuthProvider from "./Providers/AuthProvider";
import ConfigProvider from "./Providers/ConfigProvider";
import ThemeProvider from "./Providers/ThemeProvider";
import ErrorProvider from "./Providers/ErrorProvider";

import Store from "./store/Store";
import { ThemeConfig } from "./Theme/ThemeConfig";

const AppProvider = ({ children }) => (
    <ErrorBoundary>
        <Provider store={Store}>
            <BrowserRouter>
                <ThemeProvider>
                    <AuthProvider>
                        <ConfigProvider>
                            <ErrorProvider>
                                <AppLoaderComponent>
                                    <ThemeConfig>
                                        <Toaster position="top-right" />
                                        {children}
                                    </ThemeConfig>
                                </AppLoaderComponent>
                            </ErrorProvider>
                        </ConfigProvider>
                    </AuthProvider>
                </ThemeProvider>
            </BrowserRouter>
        </Provider>
    </ErrorBoundary>
)

export default AppProvider;