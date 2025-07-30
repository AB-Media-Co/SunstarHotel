import { Mail } from 'lucide-react';

export default function SunstarCareersSection() {
    return (
        <div className="bg-primary-green px-8 py-16 relative overflow-hidden">

            {/* Main content container */}
            <div className="content relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left content */}
                    <div className="space-y-6">
                        <h2 className="text-mobile/h3  md:text-desktop/h3 text-white leading-tight">
                            Ready to become a JoinUs
                        </h2>

                        <p className="text-xl text-white leading-relaxed max-w-lg">
                            Email us with your resume, including a few details about yourself & we'll take it from there.
                        </p>

                        {/* Email contact */}
                        <a
                            href="mailto:hr.recruiter@sunstarhospitality.com"
                            className="flex items-center space-x-3 bg-opacity-30 rounded-full py-4 hover:underline text-white transition"
                        >
                            <Mail className="w-6 h-6 text-white" />
                            <span className="text-lg font-medium text-white">
                                hr.recruiter@sunstarhospitality.com
                            </span>
                        </a>

                    </div>


                </div>
            </div>

        </div>
    );
}