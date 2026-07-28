const computeExperienceAndRating = (bookedOfferings) => {
    const currentDate = new Date();
    const previousOfferedBookings = bookedOfferings.filter(
        offering => new Date(offering.startDate) < currentDate
    );
    const experience = previousOfferedBookings.length;

    const ratedOfferings = previousOfferedBookings
        .filter(offering => offering.rating > 0)
        .map(item => item.rating);

    const averageRating = ratedOfferings.length > 0
        ? ratedOfferings.reduce((a, b) => a + b) / ratedOfferings.length
        : NaN;

    const averageRatingRounded = Math.round(averageRating * 100) / 100;

    if (typeof averageRatingRounded === 'number') return averageRatingRounded;
    else return 0;
};

module.exports = {
    computeExperienceAndRating
};
