import { cn } from '@/lib/utils';
import Container from './Container';


interface PageWraperProps {
    className?: string;
    preTitle?: React.ReactNode;
    title: React.ReactNode;
    description?: React.ReactNode;
    actions?: React.ReactNode;
    children: React.ReactNode;
}

const PageWraper: React.FC<PageWraperProps> = ({ className, preTitle, title, description, actions, children }) => {
    return (
        <Container className={cn("space-y-5 min-h-screen py-6 sm:py-10", className)}>
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6 sm:mb-8">
                <div>
                    {preTitle && (
                        <div className="text-sm font-medium mb-1 text-secondbase-color">
                            {preTitle}
                        </div>
                    )}
                    <h1 className='text-2xl lg:text-[28px] font-semibold text-base-color leading-[1.5]'>{title}</h1>
                    {
                        description &&
                        <p className='mt-3 text-sm text-base-color/50'>{description}</p>
                    }
                </div>
                {actions && <div className="shrink-0 flex items-center gap-2 flex-wrap">{actions}</div>}
            </div>
            {children}
        </Container>
    );
};

export default PageWraper;
