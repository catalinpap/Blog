import Image from "next/image";
import { GoBookmark, GoBookmarkFill, GoBookmarkSlash, GoBookmarkSlashFill, GoComment } from "react-icons/go";
import { IoIosHeartEmpty, IoIosHeart, IoIosHeartDislike, IoIosShareAlt } from "react-icons/io";
import { CategoryTag } from "../components/common";
import { SidePanel } from "../components";

const Article: React.FC<{}> = () => {
    return (
        <>
            {/* TODO: Extract Hero image to a separate component to avoid duplication. Also make it to be easy to integrate into HeroCarousel */}
            <div className="relative w-full h-[75dvh]">
                <Image src={"https://images.unsplash.com/photo-1524061662617-6a29d732e3ef?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                    alt=""
                    width={800}
                    height={600}
                    className="hero-bg"
                />
            </div>
            <main className="page-content">
                {/* Tools sidepanel */}
                <aside className="absolute h-full top-0 left-60 block">
                    <div className="sticky top-20 flex flex-col gap-4">
                        <IoIosHeartEmpty size={28} color={"#6C757D"} />
                        <GoBookmark size={28} color={"#6C757D"} />
                        <IoIosShareAlt size={28} color={"#6C757D"} />

                    </div>
                </aside>
                <article className="main-container">
                    <CategoryTag>Interior Design</CategoryTag>
                    <h1 className="text-[2rem] leading-normal tracking-wide mb-4">Growing a distributed product design team.</h1>
                    <div className="flex flex-row justify-between mb-16">
                        <div className="flex flex-row divide-x divide-black text-xs">
                            <span className="pr-2 font-medium">John Doe</span>
                            <span className="pl-2 text-[#6C757D] font-light">8 Sep 2023</span>
                        </div>
                        <div className="flex flex-row gap-x-3">
                            <span className="flex flex-row items-center text-xs  text-[#6C757D] gap-x-0.5">
                                <IoIosHeartEmpty size={18} color={"#6C757D"} /> 258
                            </span>
                            <span className="flex flex-row items-center text-xs  text-[#6C757D] gap-x-0.5">
                                <GoBookmark size={18} color={"#6C757D"} /> 73
                            </span>
                            <span className="flex flex-row items-center text-xs  text-[#6C757D] gap-x-0.5">
                                <GoComment size={18} color={"#6C757D"} /> 2
                            </span>
                        </div>
                    </div>
                    
                    <section className="text-[#6C757D] font-light tracking-wide">
                        Lorem ipsum dolor sit amet consectetur adipiscing elit porttitor, mollis fames scelerisque aliquam ac non est penatibus hac, 
                        sapien elementum tincidunt nunc magna varius leo. Massa luctus bibendum dapibus nisl magna netus penatibus senectus, 
                        cubilia enim sollicitudin libero nam ultricies consequat mi non, eu eget phasellus vivamus praesent vulputate fusce. 
                        Luctus turpis aptent sodales arcu hac porta torquent libero, conubia potenti vivamus dapibus molestie ut fames porttitor, 
                        vel phasellus cum suscipit curabitur morbi ante. Ullamcorper interdum tortor gravida senectus turpis vulputate semper eu, 
                        vel curabitur class imperdiet hac dictum convallis cursus, phasellus odio cubilia facilisis magna et sodales.
                    </section>
                    <section className="text-[#6C757D] font-light">
                        Lorem ipsum dolor sit amet consectetur adipiscing elit porttitor, mollis fames scelerisque aliquam ac non est penatibus hac, 
                        sapien elementum tincidunt nunc magna varius leo. Massa luctus bibendum dapibus nisl magna netus penatibus senectus, 
                        cubilia enim sollicitudin libero nam ultricies consequat mi non, eu eget phasellus vivamus praesent vulputate fusce. 
                        Luctus turpis aptent sodales arcu hac porta torquent libero, conubia potenti vivamus dapibus molestie ut fames porttitor, 
                        vel phasellus cum suscipit curabitur morbi ante. Ullamcorper interdum tortor gravida senectus turpis vulputate semper eu, 
                        vel curabitur class imperdiet hac dictum convallis cursus, phasellus odio cubilia facilisis magna et sodales.
                    </section>
                    <section className="text-[#6C757D] font-light">
                        Lorem ipsum dolor sit amet consectetur adipiscing elit porttitor, mollis fames scelerisque aliquam ac non est penatibus hac, 
                        sapien elementum tincidunt nunc magna varius leo. Massa luctus bibendum dapibus nisl magna netus penatibus senectus, 
                        cubilia enim sollicitudin libero nam ultricies consequat mi non, eu eget phasellus vivamus praesent vulputate fusce. 
                        Luctus turpis aptent sodales arcu hac porta torquent libero, conubia potenti vivamus dapibus molestie ut fames porttitor, 
                        vel phasellus cum suscipit curabitur morbi ante. Ullamcorper interdum tortor gravida senectus turpis vulputate semper eu, 
                        vel curabitur class imperdiet hac dictum convallis cursus, phasellus odio cubilia facilisis magna et sodales.
                    </section>
                    <section className="text-[#6C757D] font-light">
                        Lorem ipsum dolor sit amet consectetur adipiscing elit porttitor, mollis fames scelerisque aliquam ac non est penatibus hac, 
                        sapien elementum tincidunt nunc magna varius leo. Massa luctus bibendum dapibus nisl magna netus penatibus senectus, 
                        cubilia enim sollicitudin libero nam ultricies consequat mi non, eu eget phasellus vivamus praesent vulputate fusce. 
                        Luctus turpis aptent sodales arcu hac porta torquent libero, conubia potenti vivamus dapibus molestie ut fames porttitor, 
                        vel phasellus cum suscipit curabitur morbi ante. Ullamcorper interdum tortor gravida senectus turpis vulputate semper eu, 
                        vel curabitur class imperdiet hac dictum convallis cursus, phasellus odio cubilia facilisis magna et sodales.
                    </section>
                    <section className="text-[#6C757D] font-light">
                        Lorem ipsum dolor sit amet consectetur adipiscing elit porttitor, mollis fames scelerisque aliquam ac non est penatibus hac, 
                        sapien elementum tincidunt nunc magna varius leo. Massa luctus bibendum dapibus nisl magna netus penatibus senectus, 
                        cubilia enim sollicitudin libero nam ultricies consequat mi non, eu eget phasellus vivamus praesent vulputate fusce. 
                        Luctus turpis aptent sodales arcu hac porta torquent libero, conubia potenti vivamus dapibus molestie ut fames porttitor, 
                        vel phasellus cum suscipit curabitur morbi ante. Ullamcorper interdum tortor gravida senectus turpis vulputate semper eu, 
                        vel curabitur class imperdiet hac dictum convallis cursus, phasellus odio cubilia facilisis magna et sodales.
                    </section>

                    {/* Separator */}
                    <span className="block border border-[#CED4DA] rounded-md  w-full my-5" />

                    {/* Author */}
                    <section>
                        <h2 className="text-lg font-medium">John Doe</h2>
                        <span className="text-sm font-light text-[#6C757D]">“Fifth Strategy” Book Author, Designer</span>
                    </section>

                    {/* Separator */}
                    <span className="block border border-[#CED4DA] rounded-md  w-full my-5" />

                    {/* Comments */}
                    <section>
                        <h2 className="text-base font-medium mb-3">2 comments</h2>
                        <div className="mb-4">
                            <div className="flex flex-row justify-between">
                                <div>
                                    <p className="text-base font-medium">Jason</p>
                                    <p className="text-xs font-light text-[#6C757D] mb-2">8 Sep. 2023</p>
                                </div>
                                <div className="flex items-center gap-x-4">
                                    <span className="flex flex-row items-center text-xs  text-[#6C757D] gap-x-0.5">
                                        <IoIosHeartEmpty size={18} color={"#6C757D"} /> 10
                                    </span>
                                    <button className="text-xs font-medium text-[#6C757D] uppercase">Reply</button>
                                </div>
                            </div>
                            <p className="text-sm font-light text-[#6C757D] tracking-wide">
                                Lorem ipsum dolor sit amet consectetur adipiscing elit porttitor, 
                                mollis fames scelerisque to an aliquam ac non est penatibus hac, 
                                sapien elementum tincidunt nunc magna varius leo.
                            </p>
                        </div>
                        <div className="mb-4">
                            <div className="flex flex-row justify-between">
                                <div>
                                    <p className="text-base font-medium">Mathew</p>
                                    <p className="text-xs font-light text-[#6C757D] mb-2">8 Sep. 2023</p>
                                </div>
                                <div className="flex items-center gap-x-4">
                                    <span className="flex flex-row items-center text-xs  text-[#6C757D] gap-x-0.5">
                                        <IoIosHeartEmpty size={18} color={"#6C757D"} /> 10
                                    </span>
                                    <button className="text-xs font-medium text-[#6C757D] uppercase">Reply</button>
                                </div>
                            </div>
                            <p className="text-sm font-light text-[#6C757D] tracking-wide">
                                Lorem ipsum dolor sit amet consectetur adipiscing elit porttitor, 
                                mollis fames scelerisque to an aliquam ac non est penatibus hac, 
                                sapien elementum tincidunt nunc magna varius leo.
                            </p>
                        </div>
                    </section>
                </article>
                <SidePanel>
                    <div className="sticky top-10">
                        {/* Popular Topics */}
                        <p className="text-base font-medium mb-4">Popular Topics:</p>
                        <div className="flex flex-wrap gap-2 mb-16">
                        <CategoryTag>Lifestyle</CategoryTag>
                        <CategoryTag>Travel</CategoryTag>
                        <CategoryTag>Technology</CategoryTag>
                        <CategoryTag>Education</CategoryTag>
                        <CategoryTag>Recipe</CategoryTag>
                        <CategoryTag>Design</CategoryTag>
                        </div>

                        {/* Popular Articles */}
                        <p className="text-base font-medium mb-4">Related articles:</p>
                        <div className="cursor-pointer mb-4">
                            <CategoryTag>Interior Design</CategoryTag>
                            <p className="text-base font-light ">Growing a distributed product design team</p>
                        </div>
                        <div className="cursor-pointer mb-4">
                            <CategoryTag>Interior Design</CategoryTag>
                            <p className="text-base font-light ">Growing a distributed product design team</p>
                        </div>
                        <div className="cursor-pointer mb-4">
                            <CategoryTag>Interior Design</CategoryTag>
                            <p className="text-base font-light ">Growing a distributed product design team</p>
                        </div>
                    </div>
                </SidePanel>
            </main>
        </>
        
    );
};
export default Article;