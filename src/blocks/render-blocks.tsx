import { blockComponents } from "@/blocks/listing-blocks";

type BlockProps = {
  blockName?: string | null;
  blockType?: string | null;
  sectionID?: string | null;
  hideSection?: boolean | null;
};

type RenderBlocksProps = {
  blocks?: BlockProps[] | null;
};

async function MappingBlock({ block }: { block: BlockProps }) {
  const blockType = block.blockType || "";
  const Block = blockComponents[blockType as keyof typeof blockComponents];

  if (block.hideSection) return null;

  if (!Block) {
    return (
      <section>
        <div className="container">
          <div className="content-card">
            <strong>{blockType}</strong> block is not registered.
          </div>
        </div>
      </section>
    );
  }

  return <Block data={block as never} />;
}

export async function RenderBlocks({ blocks }: RenderBlocksProps) {
  if (!Array.isArray(blocks) || blocks.length === 0) return null;

  return (
    <>
      {blocks.map((block, index) => (
        <MappingBlock key={`${block.blockType || "block"}-${index}`} block={block} />
      ))}
    </>
  );
}
