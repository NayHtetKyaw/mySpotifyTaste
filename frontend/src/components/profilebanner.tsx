import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Share2, Clock, Calendar, PlayCircle, BarChart3 } from "lucide-react";

export default function ProfileBanner() {
    return (
        <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black z-0"></div>
            <div className="container mx-auto px-4 pt-12 pb-6 relative z-1">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                    <Avatar className="h-40 w-40 rounded-full border-4 border-white/10 shadow-2xl">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="text-5xl">L</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 text-center md:text-left">
                        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                            <h1 className="text-5xl font-bold">Long</h1>
                            <Button
                                variant="outline"
                                className="rounded-full border-white/20 bg-white/5 hover:bg-white/10"
                            >
                                <span className="mr-2">Open in Spotify</span>
                                <svg
                                    viewBox="0 0 24 24"
                                    className="h-5 w-5"
                                    fill="currentColor"
                                >
                                    <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM16.5576 16.6684C16.3319 17.0083 15.8798 17.0894 15.5399 16.8637C13.2661 15.4973 10.4077 15.2364 6.66896 16.0742C6.28293 16.1659 5.90363 15.9158 5.81192 15.5298C5.72021 15.1437 5.97033 14.7644 6.35636 14.6727C10.4267 13.7555 13.6302 14.0687 16.2623 15.6507C16.6022 15.8764 16.6833 16.3285 16.4576 16.6684ZM17.7197 13.8554C17.4318 14.2861 16.8514 14.3882 16.4207 14.1003C13.8024 12.5225 9.87304 12.1377 6.43739 13.2816C5.95176 13.4397 5.43889 13.1757 5.28081 12.6901C5.12273 12.2045 5.38677 11.6916 5.87239 11.5335C9.83309 10.2056 14.2595 10.6488 17.3748 12.5564C17.8055 12.8443 17.9076 13.4247 17.6197 13.8554ZM17.8301 10.9815C14.6335 9.12165 9.1543 8.91478 5.82697 10.0573C5.25402 10.2414 4.64677 9.92698 4.46265 9.35403C4.27853 8.78108 4.59296 8.17383 5.16591 7.98971C9.04465 6.6492 15.1355 6.89538 18.8793 9.08676C19.4042 9.40812 19.5565 10.0992 19.2351 10.6241C18.9138 11.149 18.2227 11.3013 17.6978 10.9799L17.8301 10.9815Z" />
                                </svg>
                            </Button>
                        </div>

                        <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
                            <Badge
                                variant="secondary"
                                className="bg-white/10 hover:bg-white/20"
                            >
                                2,453 Followers
                            </Badge>
                            <Badge
                                variant="secondary"
                                className="bg-white/10 hover:bg-white/20"
                            >
                                Electronic
                            </Badge>
                            <Badge
                                variant="secondary"
                                className="bg-white/10 hover:bg-white/20"
                            >
                                Ambient
                            </Badge>
                        </div>

                        <div className="flex justify-center md:justify-start gap-2">
                            <Button
                                variant="default"
                                className="rounded-full bg-purple-600 hover:bg-purple-700"
                            >
                                <PlayCircle className="mr-2 h-4 w-4" /> Play Latest
                            </Button>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <Share2 className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}