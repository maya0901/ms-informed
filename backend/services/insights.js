function generateInsights(drug, underDiscussed) {
    if (!underDiscussed.length) {
        return {
            summary: "No significant under-discussed symptom patterns detected.",
            doctor_questions: []
        };
    }

    const readableSymptoms = underDiscussed.map(symptom =>
        symptom.split("_").join(" ")
    );

    const summary = `
Several community-reported symptoms such as ${readableSymptoms.join(", ")} 
appear more frequently among women but are not clearly emphasized in official documentation. 
These patterns may warrant discussion with a healthcare provider.
`.trim();

    const doctorQuestions = readableSymptoms.slice(0, 3).map(symptom =>
        `Could ${symptom} be related to my use of ${drug}?`
    );

    return {
        summary,
        doctor_questions: doctorQuestions
    };
}

module.exports = { generateInsights };