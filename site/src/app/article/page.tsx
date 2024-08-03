import Image from "next/image";
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
                <article className="main-container">
                    <CategoryTag>Interior Design</CategoryTag>
                    <h1 className="text-[2rem] leading-normal tracking-normal mb-4">Growing a distributed product design team.</h1>
                    <div className="flex divide-x divide-black mb-16 text-xs">
                        <span className="pr-2 font-medium">John Doe</span>
                        <span className="pl-2 text-[#6C757D] font-light">8 Sep 2023</span>
                    </div>
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
                    <section className="text-[#6C757D] font-light">
                        Lorem ipsum dolor sit amet consectetur adipiscing elit porttitor, mollis fames scelerisque aliquam ac non est penatibus hac, 
                        sapien elementum tincidunt nunc magna varius leo. Massa luctus bibendum dapibus nisl magna netus penatibus senectus, 
                        cubilia enim sollicitudin libero nam ultricies consequat mi non, eu eget phasellus vivamus praesent vulputate fusce. 
                        Luctus turpis aptent sodales arcu hac porta torquent libero, conubia potenti vivamus dapibus molestie ut fames porttitor, 
                        vel phasellus cum suscipit curabitur morbi ante. Ullamcorper interdum tortor gravida senectus turpis vulputate semper eu, 
                        vel curabitur class imperdiet hac dictum convallis cursus, phasellus odio cubilia facilisis magna et sodales.
                    </section>
                </article>
                <SidePanel>
                    {/* Popular Topics */}
                    <div className="sticky top-10">
                        <h3 className="text-base font-medium mb-4">Popular Topics:</h3>
                        <div className="flex flex-wrap gap-2">
                        <CategoryTag>Lifestyle</CategoryTag>
                        <CategoryTag>Travel</CategoryTag>
                        <CategoryTag>Technology</CategoryTag>
                        <CategoryTag>Education</CategoryTag>
                        <CategoryTag>Recipe</CategoryTag>
                        <CategoryTag>Design</CategoryTag>
                        </div>
                    </div>
                </SidePanel>
            </main>
        </>
        
    );
};
export default Article;