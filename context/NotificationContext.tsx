"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

type NotificationContextType = {
    errors: string[];
    addError: (message: string) => void;
    removeError: (message: string) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
    const notification = useContext(NotificationContext);

    if (notification === undefined) {
        throw new Error("useNotification must be used within a NotificationProvider");
    }

    return notification;
};

type NotificationProviderProps = {
    children: ReactNode;
};

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
    const [errors, setErrors] = useState<string[]>([]);

    const addError = (message: string) => {
        setErrors([...errors, message]);
    };

    const removeError = (message: string) => {
        setErrors((prevErrors) => prevErrors.filter((error) => error !== message));
    };

    const contextValue: NotificationContextType = {
        errors,
        addError,
        removeError,
    };

    return (
        <NotificationContext.Provider value={contextValue}>
            {children}
        </NotificationContext.Provider>
    );
};
