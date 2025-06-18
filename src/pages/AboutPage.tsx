import * as React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AnimatedSection } from "../components/AnimatedSection";
import { Button } from "@/components/ui/button";

export const AboutPage: React.FC = () => (
    <div id="about">
        <AnimatedSection className="py-20 bg-teal-900 text-yellow-50">
            <div className="container mx-auto px-6 text-center">
                <motion.h1
                    className="text-4xl md:text-5xl font-bold mb-6"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    A Transformative Journey of Intentional Parenting
                </motion.h1>
                <motion.p
                    className="text-base md:text-xl max-w-3xl mx-auto mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                >
                    The VDC Toolkit offers a holistic approach, blending education and guidance to help children thrive. Discover personalized strategies to nurture strong character and instill enduring values.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link to="/about-details">
                        <Button variant="outline" size="lg" className="border-cream text-cream hover:bg-teal-medium hover:text-cream hover:border-teal-medium transition-all duration-200">
                            Learn More
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </AnimatedSection>
    </div>
);

