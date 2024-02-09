import { rgbaToString } from "../../helpers/colors";
import * as random from '../../helpers/random';

const params = {
    levels: 3,
    height: (height: number) => height / 3,
    width: 5,
    branchesAngleVariation: 40,
    sectionedBranching: true,
    branchSections: 3,
    grassEffect: true,
    treeColor: { r: 20, g: 20, b: 20, a: .5 },
};

const sceneParams = {
    treesAmount: (width: number) => Math.floor(width / 100),
    mainBranchAngleVariation: 5,
    clearColor: { r: 200, g: 200, b: 200, a: .3 },
    randomTreeDistributionFactor: 50,
    depth: 10
}

export class Tree {
    constructor(private w: number, private h: number, private subtrees: Tree[] = []) {

    }

    drawBranch(context: CanvasRenderingContext2D) {
        context.fillStyle = rgbaToString(params.treeColor);
        context.strokeStyle = rgbaToString(params.treeColor);
        if (params.sectionedBranching) {
            context.beginPath();
            const nodes = params.branchSections;

            for (let i = 0; i < nodes; i++) {
                context.save();
                context.translate(0, (this.h / nodes) * i);
                context.rotate((random.rangeFloor(-10, 10) * Math.PI) / 180);
                context.lineWidth = this.w / (i + 1);
                context.lineTo(this.w, this.h / nodes);
                context.stroke();
                context.restore();
            }
            context.closePath();
        } else {
            context.fillRect(0, 0, this.w, this.h);
        }
    }

    static draw(tree: Tree, context: CanvasRenderingContext2D) {
        tree.drawBranch(context);
        tree.subtrees.forEach((subtree) => {
            context.save();
            context.translate(0, tree.h - random.range(0, tree.h / 4));
            context.rotate(
                (random.rangeFloor(
                    -params.branchesAngleVariation,
                    params.branchesAngleVariation
                ) *
                    Math.PI) /
                180
            );
            Tree.draw(subtree, context);
            context.restore();
        });
    }

    static build(levels: number, w: number, h: number): Tree {
        const nodeCons = (width: number, height: number) => (subs: Tree[]) => new Tree(width, height, subs);
        if (levels <= 0) {
            return nodeCons(w, h)([]);
        } else {
            return nodeCons(
                w,
                h
            )(
                [...new Array(random.rangeFloor(2, 5))].map((_, j) =>
                    Tree.build(
                        levels - 1,
                        w * (levels / (levels + 1 + j)),
                        params.grassEffect
                            ? h / levels / (j + 1)
                            : h - ((h / levels) * j + 1)
                    )
                )
            );
        }
    }

    static drawScene(context: CanvasRenderingContext2D, width: number, height: number) {
        const t = Tree.build(params.levels, params.width, params.height(height));

        context.fillStyle = rgbaToString(sceneParams.clearColor);
        context.fillRect(0, 0, width, height);
        context.save();
        context.rotate(Math.PI);
        const treesAmount = sceneParams.treesAmount(width);
        for (let i = 0; i < treesAmount; i++) {
            const segment = width / treesAmount;
            const offset = segment * sceneParams.randomTreeDistributionFactor / 100;
            context.save();
            context.translate(segment * -i + random.rangeFloor(-offset, offset), -height);
            context.rotate(
                (random.rangeFloor(
                    -sceneParams.mainBranchAngleVariation,
                    sceneParams.mainBranchAngleVariation
                ) *
                    Math.PI) /
                180
            );
            const depth = random.range(
                1 / (sceneParams.depth * 10),
                sceneParams.depth / 10 + 1
            );
            context.scale(depth, depth);
            Tree.draw(t, context);
            context.restore();
        }
        context.restore();
    }
}