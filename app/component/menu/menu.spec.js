describe('component.menu-module-test',function(){
    beforeEach(module('templates'));
    beforeEach(module('ui.router'));
    beforeEach(module('component.menu-module'));

    it('menu directive should be defined', inject(function(directiveBuilder){
            var directive = directiveBuilder.build('<menu><menu/>');
            directive.scope.$digest();
            console.log(directive.element.html());
            expect(directive.element.html()).toBeDefined();
        })
    )

    it('customers menu item should be active', inject(function(directiveBuilder, $state){
            $state.active='customers';
            var directive = directiveBuilder.build('<menu><menu/>');
            directive.scope.$digest();
            expect(directive.element.html()).toBeDefined();

            expect(directive.element.find('li').eq(1).hasClass('active')).toBe(false);
            expect(directive.element.find('li').eq(0).hasClass('active')).toBe(false);
        })
    )
});