export const toSlug = (value) => {
     if (typeof value !== "string") return "";

    return value
            .toLowerCase()
            .trim()
            .replace(/['"]/g, "")
            .replace(/\s+/g, "-");
}