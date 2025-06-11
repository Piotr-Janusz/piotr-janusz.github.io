export const Home = () => {
    return <section id="home" className="min-h-screen flex items-center justify-center relative"> 
    <div className="text-center z-10 px-4">
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-right">
                Piotr Janusz
        </h1>

        <p className="flex max-w-xl relative items-center text-center justify-center text-gray-500">
            <svg class="w-6 h-6 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z" clip-rule="evenodd"/>
            </svg>
            Nottingham, England
        </p>
        <p className="text-lg mt-5 max-w-xl">
            Graduate software developer with a wide range of personal and academic projects with experience in both web and software development
        </p>

        <div className="flex justify-center mt-5">
            <div role="alert" class="alert alert-success alert-outline max-w-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Currently Looking For Work</span>
            </div>
        </div>
       
    </div>
       
    </section>
}