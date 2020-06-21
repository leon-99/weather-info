export const tempConverter = {
    CtoF: C => Math.round((C * 9 / 5) + 32),
    FtoC: F => Math.round((F - 32) * 5 / 9)
}