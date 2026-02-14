export function FooterCopyright() {
  return (
    <section className="bg-primary border-t border-primary-foreground/10">
      <div className="container-hero py-6">
        <div className="text-center space-y-2">
          <p className="text-xs text-primary-foreground/50">
            © {new Date().getFullYear()} Infinity Teams. All rights reserved.
          </p>
          <p className="text-[11px] text-primary-foreground/40 max-w-xl mx-auto leading-relaxed">
            Infinity Teams operates on a transparent cost-plus employment model.
            All salaries are shown at actual cost. No hidden markups.
          </p>
          <p className="text-[10px] text-primary-foreground/30 italic">
            Infinity Teams is not a freelance marketplace. All talent is full-time and managed.
          </p>
        </div>
      </div>
    </section>
  );
}
