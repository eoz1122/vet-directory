export default function GuideDisclaimer() {
    return (
        <div className="bg-primary/5 border-l-4 border-primary/20 p-6 rounded-lg my-12">
            <h4 className="text-xs font-black uppercase tracking-widest text-primary/60 mb-3">
                ⚠️ Important Disclaimer
            </h4>
            <div className="space-y-3 text-sm text-primary/70 leading-relaxed">
                <p>
                    <strong>Medical Disclaimer:</strong> This guide is for informational purposes only and does not constitute professional veterinary advice.
                    Always consult with a licensed veterinarian for medical decisions regarding your pet's health.
                </p>
                <p>
                    <strong>Emergency Situations:</strong> In case of a pet emergency, contact a veterinary professional immediately.
                    The information provided here should not delay seeking professional care.
                </p>
                <p className="text-xs text-primary/50 pt-2 border-t border-primary/10">
                    We review source links and clinic details periodically, but details can change between reviews.
                    Please confirm current information directly with the veterinary practice before visiting or booking.
                    If you spot an outdated detail, <a href="/contact?topic=report_issue" className="font-bold underline underline-offset-2">report an outdated detail</a>.
                </p>
            </div>
        </div>
    );
}
