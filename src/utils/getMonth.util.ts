

export const getCurrentMonth = () => {
    const today = new Date();
    return String(today.getMonth() + 1).padStart(2, '0');
};